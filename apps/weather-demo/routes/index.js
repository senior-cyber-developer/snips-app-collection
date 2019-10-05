const express = require('express');
const request = require('request');
const moment = require('moment');

const config = require('../config.json')
const secrets = require('../secrets.json')

const router = express.Router();

/**
 * Turns degress kelvin to degrees celsius.
 * @param {Number} kelvin Temperature in degrees kelvin
 */
function kelvinToCelsius(kelvin) {
  return Math.round(kelvin - 273.15);
}

/**
 * Takes api results and creates result object that contains only contains
 * the stuff needed on the dashboard.
 * @param {object} currentWeather Api result about current weather
 * @param {object} forecast Api result about forecast
 */
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
    const name = 'Senoir Cyber Developer';
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
      // function with some experimental sentence 
      function GenerateVoiceFeedback()
      {
        var sentencOptions =
        [
          // Can Snips tell some really bad jokes? Let's try it!
          ` What's  the  difference  between  a  chick  pea  and  a  potato?? Mr. ${name}? ... The Answer is: In little nazis. Now to the Weather: `,
          ` How  did  Hitler  tie  his  shoes? Mr. ${name}? ... The Answer is: You wouldn't pay to have a potato on you!. Now to the Weather: `,
          ` What  do  you  call  a  lesbian  dinosaur? Mr. ${name}? ... The Answer is: Lickalotapus. Now to the Weather: `,
          ` What  do  you  call  a  belt  made  out  of  watches?? Mr. ${name}? ... The Answer is: A waist of time!. Now to the Weather: `,
          ` What  do  you  do  when  your  shoes  get  holes  in  them? Mr. ${name}? ... The Answer is: Reboot!. Now to the Weather: `,
          ` What  do  you  call  a  blind  dinosaur? Mr. ${name}? ... The Answer is: Doyouthinkhesaurus. Now to the Weather: `,
          ` What  kind  of  shoes  does  a  pedophile  wear? Mr. ${name}? ... The Answer is: White vans. Now to the Weather: `,
          ` Did  you  hear  about  the  guy  who  invented  the  knock  knock  joke? Mr. ${name}? ... The Answer is: He won the "no-bell" prize!. Now to the Weather: `      
        ]

        var min = 1;
        var max = sentencOptions.length;
        var x = Math.round(Math.random() * (max - min)) + min;

        return sentencOptions[x].toString();
      }

      // local function to calculate the time of sunrise
      function GetSunrise()
      {
        var sec = currentWeather.sys.sunrise;
        var date = new Date(sec * 1000);
        return date.toLocaleTimeString();
      }

<<<<<<< HEAD
      // function with some experimental sentence 
      function GenerateVoiceFeedback()
      {
        var sentencOptions =
        [
          // Can Snips tell some really bad jokes? Let's try it!
          ` What's  the  difference  between  a  chick  pea  and  a  potato?? Mr. ${name}? ... The Answer is: In little nazis. Now to the Weather: `,
          ` How  did  Hitler  tie  his  shoes? Mr. ${name}? ... The Answer is: You wouldn't pay to have a potato on you!. Now to the Weather: `,
          ` What  do  you  call  a  lesbian  dinosaur? Mr. ${name}? ... The Answer is: Lickalotapus. Now to the Weather: `,
          ` What  do  you  call  a  belt  made  out  of  watches?? Mr. ${name}? ... The Answer is: A waist of time!. Now to the Weather: `,
          ` What  do  you  do  when  your  shoes  get  holes  in  them? Mr. ${name}? ... The Answer is: Reboot!. Now to the Weather: `,
          ` What  do  you  call  a  blind  dinosaur? Mr. ${name}? ... The Answer is: Doyouthinkhesaurus. Now to the Weather: `,
          ` What  kind  of  shoes  does  a  pedophile  wear? Mr. ${name}? ... The Answer is: White vans. Now to the Weather: `,
          ` Did  you  hear  about  the  guy  who  invented  the  knock  knock  joke? Mr. ${name}? ... The Answer is: He won the "no-bell" prize!. Now to the Weather: `      
        ]
  
        var min = 1;
        var max = sentencOptions.length;
        var x = Math.round(Math.random() * (max - min)) + min;
  
        return sentencOptions[x].toString();
      }

      // local function to calculate the time of sunrise
      function GetSunrise()
      {
        var sec = currentWeather.sys.sunrise;
        var date = new Date(sec * 1000);
        return date.toLocaleTimeString();
      }

=======
>>>>>>> master
      // local function to calculate the time of sunset
      function GetSunset()
      {
        var sec = currentWeather.sys.sunset;
        var date = new Date(sec * 1000);
        return date.toLocaleTimeString();
      }
<<<<<<< HEAD

      // generate response text
      responseText = GenerateVoiceFeedback() + `  There  are  ${currentWeather.weather[0].description}  at ${kelvinToCelsius(currentWeather.main.temp)}  degrees  celsius  currently  in ${config.city}.`
      responseText = responseText + ` The  Speed  of  Wind  is  ${currentWeather.wind.speed} ` ;
      responseText = responseText + ` Today  the  Sun  will  rise  at ${GetSunrise()}`;
      responseText = responseText + ` Today  the  Sun  will  set  at ${GetSunset()}`;
=======
>>>>>>> master

      // generate response text
      responseText = GenerateVoiceFeedback() + `  There  are  ${currentWeather.weather[0].description}  at ${kelvinToCelsius(currentWeather.main.temp)}  degrees  celsius  currently  in ${config.city}.`
      responseText = responseText + ` The  Speed  of  Wind  is  ${currentWeather.wind.speed} ` ;
      responseText = responseText + ` Today  the  Sun  will  rise  at ${GetSunrise()}`;
      responseText = responseText + ` Today  the  Sun  will  set  at ${GetSunset()}`;
      
      // next request the forecast
      request({
        url: `http://api.openweathermap.org/data/2.5/forecast?q=${config.city},${config.country}&APPID=${secrets.apiKey}`,
        method: 'GET'
      }, (error, response, body) => {
        const forecast = JSON.parse(body);
        const result = craftResult(currentWeather, forecast);

        if (error) {
          console.log(error.message);
          responseText = `Error. ${error.message}`;
  
          // ... and send it to assistant
          res.json({ responseText });
          return;
        }

        // and finally send result to dashboard...
        request({
          url: `http://localhost:3000/apps/weather`,
          method: 'POST',
          json: result,
        });

        // and to the assistant
        res.json({ responseText });
      });
    })
  });

module.exports = router;
