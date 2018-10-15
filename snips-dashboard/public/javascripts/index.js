$(function () {
  var socket = io();

  socket.on('wakeword-detected', function(msg){
    $('#intent-result').html('');
    $('#listen-indicator').html('listening...')
  });

  socket.on('show-weather', (args) => {
    $('#listen-indicator').html('');

    const appResult = JSON.parse(args);
    console.log(args);
    const weatherResultString = `Weather in ${appResult.name}: ${appResult.weather[0].description} at ${appResult.main.temp - 273.15}°C.`
    $('#intent-result').html(weatherResultString);

  });
});