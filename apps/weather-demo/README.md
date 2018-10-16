# Snips Weather Demo

Snips app that uses [OpenWeatherMap](https://openweathermap.org/) to fetch the current weather.

## Link To App Store

The required snips app for your assistant can be found here: https://console.snips.ai/store/en/bundle_mp7rG4po7mE

## Intents

* `kuper-adrian:showWeather`

## How To Run

1. Add the app to your snips assistant and deploy it
2. Clone this repo
3. Navigate to this folder inside a terminal
4. Execute `npm install`
5. Get an API key from [OpenWeatherMap](https://openweathermap.org/)
6. Create `secrets.json` file inside this directory and add the following contents (while replacing UPPERCASE values)
```json
{
  "apiKey": "API_KEY_HERE"
}
```
7. (optional) Change city and country code inside the `config.json`
7. Execute `npm start`
8. After activating your assistant with your wakeword, trigger the `showWeather` intent by saying something like "show me the weather, please".