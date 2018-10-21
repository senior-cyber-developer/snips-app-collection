var express = require('express');
var router = express.Router();

var test = require('socket.io')

/* GET home page. */
router.get('/', function(req, res, next) {
  test.toString
  res.render('index', { title: 'Snips Dashboard' });
});

module.exports = router;
