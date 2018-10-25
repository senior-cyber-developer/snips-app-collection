const express = require('express');
const bodyParser = require('body-parser');

const indexRouter = require('./routes/index');

const api = express();
const PORT = 9004;

api.use(bodyParser.json());

api.use(indexRouter);

// send 404 for all other requests
api.get('*', (req, res) => {
  res.status(404).send('not found');
});

// start listening
api.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});