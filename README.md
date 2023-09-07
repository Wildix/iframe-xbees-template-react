# iFrame embeddable into X-Bees UI integration app

This template provides a minimal setup to get React working inside X-Bees App.

1. Import [xBeesConnect](https://app.x-bees.com/integrations/xBeesConnect.js) (see [index.html](template-react/index.html:5)) library


## Quick Start

1. `yarn install`
2. `yarn dev`

- use NGROK for tunneling (setup [here](https://ngrok.com/download))

3. `ngrok http 5173` 
4. Open x-bees web app

Configure x-bees integrations adding your temporary integration locally like this:

save additional test integrations for local test with browser console
```
  localStorage.setItem('iframeIntegrationsMock', JSON.stringify([ ...<put WimIFrameIntegration objects here> ]))
```

clean with:
```
localStorage.removeItem('iframeIntegrationsMock')
``` 
example:

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
