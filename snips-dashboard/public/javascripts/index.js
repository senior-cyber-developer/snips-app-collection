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
      success: (htmlResult, textStatus, jqXHR) => {
        console.log('success');
        $('#intent-result').html(htmlResult);

        var labels = [];
        var data = [];

        var maxTemp = -100;
        var minTemp = 100;

        appResult.forecast.forEach((item) => {
          labels.push(moment(item.time).format('HH:mm:ss'));
          data.push(item.temp);

          if (minTemp > item.temp) {
            minTemp = item.temp;
          }

          if (maxTemp < item.temp) {
            maxTemp = item.temp;
          }
        });

        var ctx = document.getElementById("temp-chart").getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: '°C',
                    data: data,
                    fill: false,
                    borderColor: 'rgba(66, 134, 244, 222)'
                }],
            },
            options: {
              scales: {
                yAxes: [{
                    display: true,
                    ticks: {
                        suggestedMin: minTemp - 3,    // minimum will be 0, unless there is a lower value.
                        suggestedMax: maxTemp + 3
                    }
                }]
            }
            }
        });
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