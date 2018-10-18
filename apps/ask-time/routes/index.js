const express = require('express');
const request = require('request');

const config = require('../config.json')
const secrets = require('../secrets.json')

const router = express.Router();

router.route('/')
  .post((req, res) => {
    const snipsMessage = req.body;
    console.log(JSON.stringify(snipsMessage));

    // poll OpenWeatherMap api for current weather ...
    request({
      url: `http://api.openweathermap.org/data/2.5/weather?q=${config.city},${config.country}&APPID=${secrets.apiKey}`,
      method: 'GET'
    }, (error, response, body) => {
      let responseText = '';
      const apiResult = JSON.parse(body);

      // send api result to dashboard...
      // request({
      //   url: `http://localhost:3000/apps/weather`,
      //   method: 'POST',
      //   json: apiResult,
      // });

      // ... generate and send responsetext to assistant.
      if (error) {
        console.log(error.message);
        responseText = `Error. ${error.message}`;
      } else {
        var currentdate = new Date();
        var answerHours = currentdate.getHours();
        var answerMinutes = currentdate.getMinutes();
        if(answerHours<10)
        {
          responseText = `Good Morning, it is ${answerHours} o'clock and  ${answerMinutes} Minutes. Have a nice Day `
        } else if (answerHours>=10 && answerHours <18)
        {
          responseText = `It is ${answerHours} o'clock and  ${answerMinutes} Minutes.`
        }
        responseText = `Good Afternoon, it is ${answerHours} o'clock and  ${answerMinutes} Minutes. Have a nice evening ` 
      }

      // send it to assistant
      res.json({ responseText });
    })
  });

module.exports = router;