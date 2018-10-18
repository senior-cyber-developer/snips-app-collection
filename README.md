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

## How To Contribute An App

### Requirements

* [Node.js](https://nodejs.org/en/) which comes with `npm`. __Node.js__ is a Javascript runtime and is needed to run the intent-listener service and the dashboard website.
* Free account at the [Snips Console Website](https://console.snips.ai/login). Here you will create your own voice assistant app which later provides intents for your intent action service.

**Note:** It's _not_ necessary to have an Raspberry Pi in order to contribute. Furthermore, even though Node.js is required to run the intent listener service and the dashboard, your own intent action service can be written in any programming language. So feel free to choose the one you like the most.

### Downloading And Setting Up The Project

1. Clone this repository (or alternatively download it as `.zip` file)
2. Open a terminal/command line window and navigate to the project.
3. Navigate to `snips-dashboard/` and run `npm install` in order to download all required dependencies required to run the dashboard web app. Check that everything is working by running `npm start`.
4. Navigate to `intent-listener/` and run `npm install` in order to download all required dependencies required to run the intent listener service. __Note:__ This service can be started with `npm start` as well, but will only work if there is a Snips voice assistant available under the IP address mentioned in the `config.json` file. But don't worry: This service isn't necessary to make sure your app will work with the snips-app-collection, so please feel free to continue with or without an Raspberry Pi.

So far so good. Next, we will create our own app through the Snips Console website.

### Creating And Publishing Our Own Snips App

The intent listener service needs intents he can listen to. These will be provided by our own Snips app created on the Snips Console Website:

1. Go to https://console.snips.ai/login and login with your credentials.
2. Go to the "My Apps" tab and click "Create a New App"
3. In the new dialog, select a picture, language, name (e.g. `Weather-Demo`) and description for your app and click "Create".
4. Now we will create out intent. Click "Create New Intent" and enter a name (e.g. `showWeather`) and an description. Then click "Create".
5. Next we will need to create a so-called _Slot_. Slots are entities or key phrases that have to be extracted from your voice command. Click "+ Add Slot", enter a fitting name (e.g. `weather`) and choose a type. If none of the existing types fit your slot, you can create a new, custom slot type by clicking "New Slot Type".
6. Once your slot is created it's time to add training examples for your intent. Click on "Type your training example..." and type an example sentence which might be used by you to trigger your voice assistant (e.g. `Show me the weather please`). Make sure to mark the slots in your sentences by highlighting them and selecting the fitting slot in the popup. Also: The more training sentences, the better.
7. After feeding enough training examples, feel free to test the detection of your voice command by clicking on the microphone at to top right corner.
8. Save your intent by clicking the "Save" button on the bottom right.

If you need more help on creating your own intents, please refer to the official [docs](https://snips.gitbook.io/documentation/console/set-intents#create-your-intents-slots). If your have an Raspberry Pi running Snips feel free to add your new app to your assistant.

### Adding An Intent Action Service

Now it's time to program the action, which will take please when the intent of your app triggers.

1. In the snips-app-collection project create a new folder inside `apps/` and name it after your app (e.g. `weather-demo/`).
2. TODO

### Talking To The Dashboard

TODO

### Wiring Everything Up

TODO

## Hacktoberfest 2018 Roadmap For Participants

TODO

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