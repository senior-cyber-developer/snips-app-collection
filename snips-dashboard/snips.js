const mqtt = require('mqtt');

const SNIPS_HOST = '192.168.188.36';

exports.init = (io) => {
  const snipsClient  = mqtt.connect('mqtt://' + SNIPS_HOST, { port: 1883 });

  snipsClient.on('connect', function () {
    console.log("Connected to " + SNIPS_HOST);
    // Subscribe to the hotword detected topic
    snipsClient.subscribe('hermes/hotword/default/detected');

    snipsClient.subscribe('hermes/intent/kuper-adrian:showBuilds');
    snipsClient.subscribe('hermes/intent/kuper-adrian:showWeather');

    snipsClient.subscribe('hermes/dialogueManager/sessionStarted');
    snipsClient.subscribe('hermes/dialogueManager/sessionQueued');
    snipsClient.subscribe('hermes/dialogueManager/sessionEnded');
  });

  snipsClient.on('message', function (topic, messageBuffer) {
    console.log('');
    console.log('-------------------------------------------')
    console.log(`topic: "${topic}"`);
    
    const messageString = messageBuffer.toString('utf-8');
    console.log(messageString);

    const message = JSON.parse(messageString);
    

    if (topic == 'hermes/hotword/default/detected') {
      console.log("Wakeword detected!");
      io.emit('wakeword-detected')
    } else if (topic == 'hermes/intent/kuper-adrian:showBuilds') {
      io.sockets.emit('show-builds');

      snipsClient.publish('hermes/dialogueManager/endSession', JSON.stringify({
        text: 'Here you go',
        sessiondId: message.sessiondId
      }))
    }
  });
}

