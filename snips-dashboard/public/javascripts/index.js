$(function () {
  var socket = io();

  socket.on('wakeword-detected', function(msg){
    $('#intent-result').html('');
    $('#listen-indicator').html('listening...')
  });

  socket.on('show-builds', () => {
    $('#listen-indicator').html('');
    $('#intent-result').html('here are the latest jenkins builds!');
  });
});