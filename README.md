# snips-app-collection

A collection of apps working with the [snips voice assistant](https://makers.snips.ai/) and posting their results to a "dashboard"-like web app.

Made for [Hacktoberfest 2018](https://hacktoberfest.digitalocean.com/).

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

## Links

* [snips](https://makers.snips.ai/)
* [hacktoberfest](https://hacktoberfest.digitalocean.com/)