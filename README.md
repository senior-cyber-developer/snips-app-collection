# snips-app-collection

A collection of apps working with the [snips voice assistant](https://makers.snips.ai/) and posting their results to a "dashboard"-like web app.

Made for [Hacktoberfest 2018](https://hacktoberfest.digitalocean.com/). Please check the [Hacktoberfest Roadmap](https://github.com/senior-cyber-developer/snips-app-collection#hacktoberfest-2018-roadmap-for-participants) below if you want to participate.

## How It Works

The idea of this repository is to provide a collection of apps for the snips voice assistant that present their result not only by the assistants voice but also through a single, unified "dashboard"-like web app, that can be displayed on a status monitor for example.

To archieve this, the repo is devided into three main parts:

1. `intent-listener`: Inside this folder is a tiny NodeJS-app (see in `index.js`) that listens for [MQTT](https://en.wikipedia.org/wiki/MQTT) messages emitted by the snips [Hermes](https://snips.gitbook.io/documentation/ressources/hermes-protocol) protocoll. This service reacts to all intents provided by the snips voice assistant and delegates the handling of these events further to their respective "intent action service" (located in `apps` folder, see 3.).
2. `snips-dashboard`: This is the "dashboard"-like web app. Snips apps can send http-post requests against their specific endpoint to control the contents displayed on the web page.
3. `apps`: Inside this folder reside the actions taken for every intent of every supported snips app. **Important:** These are not the "snips apps" themselves, which have to be created and deployed to the assistant through the [snips console website](https://console.snips.ai/). Instead, here reside little services (for every supported snips app) that act as "intent action" handler. They do this by listening for http-post requests made by the intent-listener-service against the url provided inside the `config.json` file. They then post their results back through http requests to both the intent listener service and the dashboard web app.

For everything to work, one has to start the intent-listener and the dashboard web app. For each supported app deployed to the assistant the corresponding intent action service inside `apps` has to be started as well.

The following graphic shows how the compontents interact with each other:
```
+-----------------------+
|                       |
| Snips Voice Assistant |
|                       |
| +------------------+  |                                 +-------------------------+
| |                  |  |       showWeather-intent        |                         |
| | weather-demo-app +----------------------------------->+ Intent Listener Service |
| |                  |  |                                 |                         |
| +------------------+  <---------------------------------+-+-+---------------------+
|                       |      assistant voice text         | ^
+---+------------+------+                                   | |
    ^            |                                          | |
    |            |                       showWeather-intent | | assistant voice text
    | voice      | answer                                   | |
    |            |                                          | |
    |            v                                          v |
  +-+------------+--+                                  +----+-+----------------------+
  |                 |                                  |                             |
  |    User         |                                  | weather-demo action service |
  |                 |                                  |                             |
  +-----------------+                                  +-------+---------------------+
                                                               |
                                                               |
                                                               | more weather info
                                                               |
                                                               |
                                                         +-----v-----+
                                                         |           |
                                                         | Dashboard |
                                                         |           |
                                                         +-----------+
```

## Currently Supported Snips-Apps

* [__Weather-Demo__](https://console.snips.ai/store/en/bundle_mp7rG4po7mE): Ask your lovely voice assistant about the weather and see all the details on the dashboard.
* [__Ask-Time__](https://console.snips.ai/app-editor/bundle_zqA7PwkWONrx): To lazy to pull out your phone to check the time? Just ask your well-mannered voice assistant without moving a finger!
* [__News__](https://console.snips.ai/app-editor/bundle_GqzwBxGN1al): Want to know about the latest news and headlines? Your voice assistant is always informed on any topic.

## How To Contribute An App

### Requirements

* [Node.js](https://nodejs.org/en/) which comes with `npm`. __Node.js__ is a Javascript runtime and is needed to run the intent-listener service and the dashboard website.
* Free account at the [Snips Console Website](https://console.snips.ai/login). Here you will create your own voice assistant app which later provides intents for your intent action service.

**Note:** It's _not_ necessary to have an Raspberry Pi in order to contribute. Furthermore, even though Node.js is required to run the intent listener service and the dashboard, your own intent action service can be written in any programming language. So feel free to choose the one you like the most.

### Downloading And Setting Up The Project

1. Clone this repository (or alternatively download it as `.zip` file)
2. Open a terminal/command line window and navigate to the project.
3. Navigate to `snips-dashboard/` and run `npm install` in order to download all required dependencies required to run the dashboard web app. Check that everything is working by running `npm start`.
4. Navigate to `intent-listener/` and run `npm install` in order to download all required dependencies required to run the intent listener service. __Note:__ This service can be started with `npm start` as well, but will only work if there is a Snips voice assistant available under the IP address mentioned in the `config.json` file. But don't worry: This service isn't necessary to make sure your app will work with the snips-app-collection, so please feel free to continue with or without a Raspberry Pi.

So far so good. Next, we will create our own app through the Snips Console website.

### Creating And Publishing Our Own Snips App

The intent listener service needs intents he can listen to. These will be provided by our own Snips app created on the Snips Console Website:

1. Go to https://console.snips.ai/login and login with your credentials.
2. Go to the "My Apps" tab and click "Create a New App"
3. In the new dialog, select a picture, language, name (e.g. `Weather-Demo`) and description for your app and click "Create".
4. Now we will create out intent. Click "Create New Intent" and enter a name (e.g. `showWeather`) and an description. Then click "Create".
5. Next we will need to create a so-called _Slot_. Slots are entities or key phrases that have to be extracted from your voice command. Click "+ Add Slot", enter a fitting name (e.g. `weather`) and choose a type. If none of the existing types fit your slot, you can create a new, custom slot type by clicking "New Slot Type".
6. Once your slot is created, it's time to add training examples for your intent. Click on "Type your training example..." and type an example sentence which might be used by you to trigger your voice assistant (e.g. `Show me the weather please`). Make sure to mark the slots in your sentences by highlighting them and selecting the fitting slot in the popup. Also: The more training sentences, the better.
7. After feeding enough training examples, feel free to test the detection of your voice command by clicking on the microphone at the top right corner.
8. Save your intent by clicking the "Save" button on the bottom right.

If you need more help on creating your own intents, please refer to the official [docs](https://snips.gitbook.io/documentation/console/set-intents#create-your-intents-slots). If your have an Raspberry Pi running Snips feel free to add your new app to your assistant.

### Adding An Intent Action Service

Now it's time to program the intent action service, which will execute the desired action when the intent of your app triggers.

1. In the snips-app-collection project create a new folder inside `apps/` and name it after your app (e.g. `weather-demo/`).
2. In the newly created folder we will now have to create our small program that executes the action which should be triggered by the intent of our Snips app. This can be done with any programming language. The only thing necessary for your program is to be able to receive and send http request. Using Node.js, Javascript and the [Express](https://expressjs.com/) and [Request](https://github.com/request/request) frameworks your intent action service could be made in basicly two files (you can see the whole working weather-demo inside `./apps/weather-demo/`):

`./apps/weather-demo/index.js`:
```javascript
const express = require('express');
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');

const api = express();
const PORT = 9002;

api.use(bodyParser.json());
api.use(indexRouter); // index router listens on http://localhost:9002/

// send 404 for all other requests
api.get('*', (req, res) => {
  res.status(404).send('not found');
});

// start listening
api.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
```
`./apps/weather-demo/routes/index.js`:
```javascript
const express = require('express');
const request = require('request');

const router = express.Router();

// http://localhost:9002/
router.route('/').post((req, res) => {
  const snipsMessage = req.body;
  const weatherInfo = { temp: 12, main: "Cloudy" };
  
  // send http post request to dashboard web app with
  // weather data so it can be displayed
  request({
    url: `http://localhost:3000/apps/weather`,
    method: 'POST',
    json: weatherInfo,
  });

  responseText = `The weather is ${weatherInfo.main}. It is ${weatherInfo.temp} degrees celsius.`
  
  // send response text back to assistant
  res.json({ responseText });
});

module.exports = router;
```

That's basicly it. At this point (if you have a Raspberry Pi with a Snips assistant running) you should be able to start the intent listener and your intent action service, make your voice command and hear your lovely assistant responding to your request.

__Remember:__ Feel free to use any language and framework you like for this. The only thing important is, that you can listen for http request, which will be send by the intent listener service to an configureable url, and that you can emit http requests yourself in order to update the dashboard.

### Talking To The Dashboard

As you may have noticed, we sent a http request to the dashboard in out intent action service earlier. In order for the dashboard to update itself we have to modify though.

1. Navigate to `snips-dashboard/` and create a new `.js` file inside `routes/apps/` which has the name of your app.  This file will be the http request handler at `http://localhost:3000/apps/[your-app-name]`.
2. Add the following template code (remember to replace placeholder by their respective values for your app):

```javascript
const express = require('express');
const router = express.Router();

let io;

router.post('/[your-intent-name]', function(request, response){
  if (!io) {
    io = require('../../socket-helper').io;
  }

  const actionServiceMessage = req.body;

  io.sockets.emit('[your-intent-name]', JSON.stringify({ some: 'message for the dashboard' }));
  
  res.status(200).send();
});

module.exports = router;
```

3. Inside the above code example we handle the post request emitted by our intent action service and use `io.sockt.emit()` to send a message to the dashboard in real-time.
4. TODO

### Wiring Everything Up

TODO

## Hacktoberfest 2018 Roadmap For Participants

First make sure to read this README and the docs about Snips to make yourself acquainted with the project. Then you could do the following to gain some pull request for Hacktoberfest:

* In order to learn how to do a pull request: fork this repository and create a folder inside `apps/` named after an app you would like to add. Inside your newly created folder add a `README.md` that contains some basic info about the app you would like to create. Then you could open your first pull request to show everyone what you will be working on.
* Next, go to [console.snips.ai](http://console.snips.ai) and create an app with all the intents you will need. Then implement the intent action service inside `apps/[your-app-name]/`. Your app does not have to be perfect at this point, but should at least provide a reasonable answer thorugh the voice assistant. You should publish your snips app to the snips store and link it inside the README of your app. Otherwise other people won't be able to try your app. Also: Dont' forget to add your intents to the `config.json` of the intent listener service. After that you could open another pull request for everyone to try your app for the first time. 
* Make sure your app works with the dashboard. Add a http request to your intent action service to the dashboard that sends some info you want to display on the web page. Then go to the `snips-dashboard/` project, add a route inside `routes/apps/[your-app-name]/` and emit a socket.io event to the dashboard web page. Lastly add an socket.io event listener to `public/javascripts/index.js` and change to dashboard with the data of your app. If the dashboard updates and displays some info in addition to your voice assistant speaking, open another pull request in order to share.
* Improve or add to an existing app and open a pull request.
* Anything you like or you think is missing.

Most importantly: Have fun, happy coding and happy Hacktoberfest :beers:

### Idea Collection For Hacktoberfest

__New Apps:__

* Jenkins CI ("Show me the latest build results.")
* Timer ("Set a timer for 10 minutes.")
* Jokes ("Tell me a joke.")
* Time ("What time is it?", "What time is it in New York?")
* Math/Currency ("How much is 5$ in Yen?", "What is 1337 + 42?")
* ...

__Improve An Existing App:__

* Add new intents
* Improve the infos provided on the dashboard
* ...

__Other:__

* Improve this README (e.g. with new hacktoberfeset ideas :wink:)
* Improve any of the main compontents (intent listener service or the dashboard)
* ...

## Links

* [snips](https://makers.snips.ai/)
* [hacktoberfest](https://hacktoberfest.digitalocean.com/)
