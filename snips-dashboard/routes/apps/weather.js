var express = require('express');
var router = express.Router();
var weatherIcons = require('./icons.json');

let io;

router.post('/weather', function(req, res, next) {
  if (!io) {
    io = require('../../socket-helper').io;
  }

  const weatherAppMessage = req.body;

  try {
    io.sockets.emit('show-weather', JSON.stringify(weatherAppMessage));
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
    return;
  }
  res.status(200).send();
});

router.post('/weather/render', (req, res) => {
  const weatherData = req.body;

  // change temperature to °C
  weatherData.main.temp = Math.round(weatherData.main.temp - 273.15);

  const prefix = 'wi wi-';
  const code = weatherData.weather[0].id;
  let icon = weatherIcons[code].icon;

  // If we are not in the ranges mentioned above, add a day/night prefix.
  if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
    icon = 'day-' + icon;
  }

  // Finally tack on the prefix.
  icon = prefix + icon;
  console.log(icon);

  weatherData.iconClass = icon;

  res.render('apps/weather', weatherData);
});

module.exports = router;
