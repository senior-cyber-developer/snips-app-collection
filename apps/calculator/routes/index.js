const express = require('express');
const request = require('request');

const router = express.Router();

router.route('/')
  .post((req, res) => {
    const snipsMessage = req.body;
    console.log(JSON.stringify(snipsMessage));

    let responseText = 'The result is ';
    
    //Get values from the defined slots in the Intent
    var number1 = snipsMessage['slots'][0]['value']['value'];
    var operation = snipsMessage['slots'][1]['value']['value'];
    var number2 = snipsMessage['slots'][2]['value']['value'];

    //choose the correct mathematical operation
    if (operation == '+'){
        responseText += (number1+number2).toString();
    }
    else if (operation == '-'){
        responseText += (number1-number2).toString();
    }
    else if (operation == '*'){
        responseText += (number1*number2).toString();
    }
    else if (operation == '/'){
        responseText += (number1/number2).toString();
    }
    else if (operation == '^'){
        responseText += (Math.pow(number1,number2)).toString();
    }
    // ... generate and send responsetext to assistant.

    request({
      url: `http://localhost:3000/apps/calculator`,
      method: 'POST',
    });
    // send it to assistant
    res.json({ responseText });
  });

module.exports = router;