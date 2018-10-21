var express = require('express');
var router = express.Router();

let io;

/* GET home page. */
router.post('/askTime', function(req, res, next) {
  if (!io) {
    io = require('../../socket-helper').io;
  }
  // TODO: remove.
  const weatherAppMessage = req.body;

  try {
    io.sockets.emit('ask-time', JSON.stringify(weatherAppMessage));
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
    return;
  }
  res.status(200).send();
});

module.exports = router;
