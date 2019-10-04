const express = require('express');
const request = require('request');

const config = require('../config.json')
const secrets = require('../secrets.json')

const router = express.Router();

// actual set the number of news to a fix value.
// it offers the possibility to add new intents (here for e.g. number of news).
const numberOfNews = 5;

router.route('/')
  .post((req, res) => {
    const snipsMessage = req.body;
	console.log(JSON.stringify(snipsMessage));
	
	const requestedCategory = snipsMessage.slots[0].rawValue;
	let requestUrl = '';
	if(requestedCategory == 'headline') {
		requestUrl = `https://newsapi.org/v2/top-headlines?country=${config.country}&apiKey=${secrets.apiKey}`;
	}
	else {
		requestUrl = `https://newsapi.org/v2/top-headlines?country=${config.country}&category=${requestedCategory}&apiKey=${secrets.apiKey}`;
	}
	
    // poll News API for headlines
    request({
	  url: requestUrl,
	  // url: `https://newsapi.org/v2/top-headlines?country=${config.country}&category=${requestedCategory}&apiKey=${secrets.apiKey}`,
      method: 'GET'
    }, (error, response, body) => {
      let responseText = '';
      const apiResult = JSON.parse(body);

      // make response for assistant from result...
      if (error) {
        console.log(error.message);
        responseText = `Error.  Watch  error  in  log  messages.`;
      } else {      
		    responseText = generateResponseText(numberOfNews);
      }

      // ... and send it to assistant
      res.json({ responseText });

      // function to generate some more news 
      function generateResponseText(number){
        var response = `Todays  news:  `;
        for(count = 0; count < number; count++){
          const output = apiResult.articles[count].title;
          // remove the full name of news station
          var lastIndex=output.lastIndexOf("-");     
          response = response + `${apiResult.articles[count].title.slice(0,lastIndex+1)}` + ` \n`;
        }
        return response;
      }
    })
  });
module.exports = router;