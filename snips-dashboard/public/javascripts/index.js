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

  socket.on('ask-time', (args) => {
    $('#answer-listen-indicator').html('');
    let responseText = ''; 
    console.log(args);
    console.log('[debug] ask-time activated!!');
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
    
     const weatherResultString = responseText;
    $('#answer-intent-result').html(weatherResultString);

  });
});