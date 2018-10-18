const express = require('express');

const router = express.Router();

router.route('/')
  .post((req, res) => {
    const snipsMessage = req.body;
    console.log(JSON.stringify(snipsMessage));

    let responseText = '';

    // ... generate and send responsetext to assistant.
    if (error) {
      console.log(error.message);
      responseText = `Error. ${error.message}`;
    } else {
      const currentdate = new Date();
      const answerHours = currentdate.getHours();
      const answerMinutes = currentdate.getMinutes();

      if (answerHours < 10) {
        responseText = `Good Morning, it is ${answerHours} o'clock and  ${answerMinutes} Minutes. Have a nice Day `
      } else if ( answerHours >= 10 && answerHours < 18) {
        responseText = `It is ${answerHours} o'clock and  ${answerMinutes} Minutes.`
      }
      responseText = `Good Afternoon, it is ${answerHours} o'clock and  ${answerMinutes} Minutes. Have a nice evening ` 
    }

    // send it to assistant
    res.json({ responseText });
  });

module.exports = router;