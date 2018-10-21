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
});