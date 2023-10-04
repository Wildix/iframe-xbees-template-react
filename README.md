# x-bees iFrame integration template

This template provides a minimal setup to get react working inside x-bees app.

## Setup
1. Download the template project copy
2. Build `yarn build`
3. Deploy the content of the _**./build**_ folder to the frontend environment
4. Add the URL of this integration application while setup new iFrame integration to x-bees via integrations administration console 

## Development

### Quick Start

1. Download the template project copy
2. Install dependencies `yarn install`
3. Run the template `yarn dev`
4. Implement components and integration logic

### Integrate with to x-bees
If you want integrate your local for playground during development you might need to expose your project url which will be added to x-bees
- use NGROK for tunneling (setup [here](https://ngrok.com/download))
- run `ngrok http 5173` 
- open x-bees web app and configure x-bees integrations adding your temporary integration locally.

### x-bees - iFrame communication library

The last version of https://github.com/Wildix/xBeesConnect library should be used. See help [here](https://github.com/Wildix/xBeesConnect/blob/main/README.md) 

### Adding integration in development playground
save additional test integrations for local test with browser console
```
localStorage.setItem('iframeIntegrationsMock', JSON.stringify([ ...<put WimIFrameIntegration objects here> ]))
```

clean with:
```
localStorage.removeItem('iframeIntegrationsMock')
``` 
full example:
```js
localStorage.setItem('iframeIntegrationsMock', JSON.stringify([
    {
        integrationId: 'test-iframeIntegrationsMock', // can be cahnged to any unique value
        externalId: 'it_iframe_test',
        service: 'iframe_integration', // this shouldn't be changed
        data: {
            iframeUrl: 'https://<some domain>.ngrok-free.app', // this should be changed to your iframe url
            title: 'Phonebook', // can be cahnged to any name
            usePbxToken: false, // put true if PBX token is needed for your app
            visibleInUi: true, // put false if this integrtion should be displayed in x-bees UI
            devMode: true,
            description: // add description of your app
                'This integration allows you to do smth',
        },
    },
]))
```
