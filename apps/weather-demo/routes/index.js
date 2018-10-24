const express = require('express');
const request = require('request');
const moment = require('moment');

const config = require('../config.json')
const secrets = require('../secrets.json')

const router = express.Router();


function kelvinToCelsius(kelvin) {
  return Math.round(kelvin - 273.15);
}

function craftResult(currentWeather, forecast) {
  const result = {};
  
  result.city = forecast.city;
  result.currentWeather = {
    temp: kelvinToCelsius(currentWeather.main.temp),
    id: currentWeather.weather[0].id,
    icon: currentWeather.weather[0].icon,
    description: currentWeather.weather.description,
  };

  result.forecast = [];

  const now = moment();
  forecast.list.forEach((item, index) => {
    const date = moment.unix(item.dt);
    const duration = moment.duration(date.diff(now)).asHours();
    //console.log(`now: ${now.format()}, then: ${date.format()}, duration: ${duration}h`);

    if (duration < 24) {
      result.forecast.push({
        time: date.format(),
        temp: kelvinToCelsius(item.main.temp),
        weather: item.weather,
      });
    }
  });

  result.forecast.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  return result;
}

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
      const currentWeather = JSON.parse(body);

      // ... and make response for assistant from result...
      if (error) {
        console.log(error.message);
        responseText = `Error. ${error.message}`;

        // ... and send it to assistant
        res.json({ responseText });
        return;
      }

      responseText = `${currentWeather.weather[0].description} at ${kelvinToCelsius(currentWeather.main.temp)} degrees celsius currently in ${config.city}.`

      // next request the fore cast i
      request({
        url: `http://api.openweathermap.org/data/2.5/forecast?q=${config.city},${config.country}&APPID=${secrets.apiKey}`,
        method: 'GET'
      }, (error, response, body) => {
        const forecast = JSON.parse(body);
        const result = craftResult(currentWeather, forecast);

        // send result to dashboard...
        request({
          url: `http://localhost:3000/apps/weather`,
          method: 'POST',
          json: result,
        });

        res.json({ responseText });
      });
    })
  });

module.exports = router;