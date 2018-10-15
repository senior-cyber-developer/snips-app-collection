exports.init = (server) => {
  exports.io = require('socket.io')(server);
}

