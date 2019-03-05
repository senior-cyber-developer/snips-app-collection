const express = require('express');
const bodyParser = require('body-parser');

const indexRouter = require('./routes/index');

const api = express();
const PORT = 9001;

api.use(bodyParser.json());

api.use(indexRouter);

// send 404 for all other requests
api.get('*', (req, res) => {
  res.status(404).send('not found');
});

// start listening
api.listen(PORT, () => {
  console.log(`#----------------------------------------------------------------#`);
  console.log(`| Ask-Time started successfull. Running on port ${PORT}.            |`);
  console.log(`| Thank you for utilize senior-cyber-developers Ask-Time Service |`);
  console.log(`#----------------------------------------------------------------#`)
});