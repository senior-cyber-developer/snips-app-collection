const express = require('express');
const request = require('request');

const config = require('../config.json')
const secrets = require('../secrets.json')

const router = express.Router();


router.route('/')
  .post((req, res) => {
    const snipsMessage = req.body;
	const requestedCategory = snipsMessage.slots[0].value.value;
    console.log(JSON.stringify(snipsMessage));

    // poll News API for headlines
    request({
	  url: `https://newsapi.org/v2/top-headlines?country=${config.country}&category=${requestedCategory}&apiKey=${secrets.apiKey}`,
      method: 'GET'
    }, (error, response, body) => {
      let responseText = '';
      const apiResult = JSON.parse(body);

      // make response for assistant from result...
      if (error) {
        console.log(error.message);
        responseText = `Error. ${error.message}`;
      } else {
		var randomHeadline = Math.floor(Math.random() * (apiResult.totalResults));
		responseText = `${apiResult.articles[randomHeadline].title}`
      }

      // ... and send it to assistant
      res.json({ responseText });
    })
  });

module.exports = router;