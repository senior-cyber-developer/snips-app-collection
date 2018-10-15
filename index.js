const request = require('request');
const mqtt = require('mqtt');
const config = require('./config.json');

const snipsClient  = mqtt.connect('mqtt://' + config.snipsHostAdress, { port: 1883 });

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

  console.log('READY!');
});

snipsClient.on('message', function (topic, messageBuffer) {
  console.log(`received message on topic: "${topic}"`);
  
  const message = JSON.parse(messageBuffer.toString('utf-8'));
  const intent = intents[topic];

  if (intent) {
    // send HTTP post request to configured url
    request.post({
      url: intent.url,
      method: 'POST',
      json: message,
    }, (error, response, body) => {
      if (error) {
        console.log(error.message);
      }
    });
  }
});
