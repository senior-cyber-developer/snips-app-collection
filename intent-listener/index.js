const request = require('request');
const mqtt = require('mqtt');
const config = require('./config.json');
const PORT = 1883;

const snipsClient  = mqtt.connect('mqtt://' + config.snipsHostAdress, { port: `${PORT}`  });

// lookup dictionary for all intents
const intents = {};

snipsClient.on('connect', function () {
  console.log("Connected to " + config.snipsHostAdress);

  // subscribe to configured intents of each app
  config.apps.forEach(app => {
    console.log(`subscribing to intents of app "${app.name}"...`)

    app.intents.forEach(intent => {
      const fullIntentName = `hermes/intent/${intent.name}`;
      console.log(`adding new intent: "${fullIntentName}"`);

      intents[fullIntentName] = intent;
      snipsClient.subscribe(fullIntentName);
    })
  });

  console.log(`#----------------------------------------------------------------#`);
  console.log(`| Intent-Listener started successfull. Listen on port ${PORT}.      |`);
  console.log(`| Thank you for utilize senior-cyber-developers Intent-Listener  |`);
  console.log(`#----------------------------------------------------------------#`);
});

snipsClient.on('message', function (topic, messageBuffer) {
  console.log(`received message on topic: "${topic}"`);
  
  const message = JSON.parse(messageBuffer.toString('utf-8'));
  const intent = intents[topic];

  if (intent) {
    console.log(`handling intent "${intent.name}"...`);
    // send HTTP post request to configured url
    request.post({
      url: intent.url,
      method: 'POST',
      json: message,
    }, (error, response, body) => {
      console.log(`error: ${error}`);
      console.log('------------------------------------------');
      console.log(`response: ${response}`);
      console.log('------------------------------------------');
      console.log(`body: ${body}`);

      let responseText = '';
      //const appResult = JSON.parse(body);

      if (error) {
        console.log(error.message);

        responseText = `Error. ${error.message}`; 
      } else {
        responseText = body.responseText; 
      }
      
      console.log(`response text from app: "${responseText}"`)

      snipsClient.publish('hermes/tts/say', JSON.stringify({
        text: responseText,
        siteId: message.siteId,
        sessionId: message.sessionId,
      }));
    });
  }
});
