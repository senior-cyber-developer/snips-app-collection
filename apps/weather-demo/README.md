# Snips Weather Demo

Snips app that uses [OpenWeatherMap](https://openweathermap.org/) to fetch the current weather.

## Link In App Store

TODO

## Intents

* `kuper-adrian:showWeather`

## How To Run

1. Clone parent repo
2. Navigate to this folder inside a terminal
3. Execute `npm install`
4. Get an API key from [OpenWeatherMap](https://openweathermap.org/)
5. Create `secrets.json` file inside this directory and add the following contents (while replacing UPPERCASE values)
```json
{
  "apiKey": "API_KEY_HERE"
}
```
6. Execute `npm start`