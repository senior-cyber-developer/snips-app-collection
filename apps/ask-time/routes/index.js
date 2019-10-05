const express = require('express');
const request = require('request');

const router = express.Router();

router.route('/')
  .post((req, res) => {
    const snipsMessage = req.body;
    console.log(JSON.stringify(snipsMessage));

    let responseText = '';

    // ... generate and send responsetext to assistant.
    const currentdate = new Date();
    const answerHours = currentdate.getHours();
    const answerMinutes = currentdate.getMinutes();
    // name of owner for e.g. My Lord, Iron Man, Peter Griffin,... 
    const name = `senior cyber developer `;

    if (answerHours < 10) {
      responseText = `Good Morning, it is ${answerHours} o'clock and  ${answerMinutes} Minutes. Have a nice Day`;
    } else if ( answerHours >= 10 && answerHours < 18) {
      responseText = GenerateGreedingSection() + ` It is ${answerHours} o'clock and  ${answerMinutes} Minutes.`;
    } else {
      responseText = GenerateGreedingSection() + `, it is ${answerHours} o'clock and  ${answerMinutes} Minutes. Have a nice evening`;
    }

    // not in use yet - prototype
    function generateAnswer(answerHours,answerMinutes)
    {
      // do something
      // generate greeting section of sentence
      // generate middle of sentence
      // generate ending of sentence
      // maybe give a nice sentence of what world-day is today
      return `dring some oetinger weizen!! `+ GenerateGreedingSection();
    }

    function GenerateGreedingSection()
    {
      var sentencOptions =
      [
        `Hello  Mr. ${name} `,
        `Hey! `,
        `ääääääöööhhh. What the fuck Mr. ${name}! I was sleeping so good. Okay, i will tell you something. `,
        `Mr. ${name}. I am so blue I'm greener than purple. `,
        `Mr. ${name}. I stepped on a Corn Flake, now I'm a Cereal Killer.`,
        `Mr. ${name}. On a scale from one to ten what is your favourite colour of the alphabet.`,
        `Mr. ${name}. Always remember: you're unique, just like everyone else.`,
        `Mr. ${name}. When everything's coming your way, you're in the wrong lane.`,
        `Mr. ${name}. I would never die for my beliefs because I might be wrong.`,
        `Mr. ${name}. He who laughs last, didn't get it.`,
        `Mr. ${name}. It is not my fault that I never learned to accept responsibility! `,
        `Mr. ${name}. If you can’t live without me, why aren’t you dead yet? `,
        `Good Morning Mr. ${name}.`,
        `What is going on Mr. ${name}.`,
        `Fuck, i need an Oetinger Weizen Beer  Mr. ${name}.`,
        `Oh No Mr. ${name}.`,
        `consequence also means to go wood ways to the end Mr. ${name}.`,
        `Again? Mr. ${name}.`        
      ]

      var min = 1;
      var max = sentencOptions.length;
      var x = Math.round(Math.random() * (max - min)) + min;

      return sentencOptions[x].toString();
    }


    request({
      url: `http://localhost:3000/apps/askTime`,
      method: 'POST',
    });
    // send it to Website
    res.json({ responseText });
  });

module.exports = router;