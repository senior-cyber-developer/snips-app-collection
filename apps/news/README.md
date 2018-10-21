# News

Gets a top headline of the configured country

## Link To App Store

The required snips app for your assistant can be found here: https://console.snips.ai/app-editor/bundle_GqzwBxGN1al

## Intents

* `gfxer:Headline`

## How To Run

1. Add the app to your snips assistant and deploy it
2. Clone this repo
3. Navigate to this folder inside a terminal
4. Execute `npm install`
5. Get an API key from [News API](https://newsapi.org/)
6. Create `secrets.json` file inside this directory and add the following contents (while replacing UPPERCASE values)
```json
{
  "apiKey": "API_KEY_HERE"
}
```
7. Execute `npm start`
8. After activating your assistant with your wakeword, trigger the `News` intent by saying something like "Give me a top headine"

## Future ideas

* Ask for a concrete headline, e.g. a business headline (if possible)
