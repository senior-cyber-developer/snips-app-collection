$(function () {
  var socket = io();

  socket.on('wakeword-detected', function(msg){
    $('#intent-result').html('');
    $('#listen-indicator').html('listening...')
  });

  socket.on('show-weather', (args) => {
    $('#listen-indicator').html('');

    const appResult = JSON.parse(args);

    // make post requet to /apps/weather/render
    // to get the html needed to have some nice 
    // looking weather info
    $.ajax({
      url: '/apps/weather/render',
      method: 'POST',
      data: JSON.stringify(appResult),
      contentType: 'application/json',
      success: (data, textStatus, jqXHR) => {
        console.log('success');
        $('#intent-result').html(data);
      },
      error: (jqXHR, textStatus, errorThrown) => {
        console.log('error');
        console.log(errorThrown);
      },
      complete: (jqXHR, textStatus) => {
        console.log('completed');
      },
    })
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