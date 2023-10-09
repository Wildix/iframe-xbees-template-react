# x-bees iFrame integration template

This template provides a minimal setup to enable iFrame integration inside x-bees

## Setup
1. Download a copy of the template project
2. Install dependencies: `yarn install`
3. Build the project: `yarn build`
4. Deploy the content of the _**./build**_ folder to the frontend environment
5. Add the URL of this integration application while setting up new iFrame integration to x-bees via the integrations administration console

## Development

### Quick Start

1. Download a copy of the template project
2. Install dependencies: `yarn install`
3. Run the template: `yarn dev`
4. Implement components and integration logic

### Integrate with x-bees
If you want to integrate your local environment for testing during development, you may need to expose your project URL for x-bees to access. Follow these steps:
- Use NGROK for tunneling ([setup](https://ngrok.com/download))
- Run `ngrok http 5173` 
- Open the x-bees web app and configure x-bees integrations by adding your temporary integration locally

### x-bees - iFrame communication library

Ensure that you are using the latest version of the [xBeesConnect library](https://github.com/Wildix/xBeesConnect). Refer to the documentation [here](https://github.com/Wildix/xBeesConnect/blob/main/README.md) 

### Adding integration in development playground
To save additional test integrations for local testing with the browser console, use the following command:
```js
localStorage.setItem('iframeIntegrationsMock', JSON.stringify([ ...<put iFrameIntegration objects here> ]))
```
To display integrations in development mode, use:
```js
localStorage.setItem('showDevModeIntegrations', true)
```

To clean up, use:
```js
localStorage.removeItem('iframeIntegrationsMock')
``` 
Here's a full example:
```js
localStorage.setItem('iframeIntegrationsMock', JSON.stringify([
    {
        integrationId: 'test-iframeIntegrationsMock', // can be cahnged to any unique value
        externalId: 'it_iframe_test',
        service: 'iframe_integration', // this shouldn't be changed
        data: {
            iframeUrl: 'https://<some domain>.ngrok-free.app', // this should be changed to your iframe url
            title: 'Integration title', // can be cahnged to any name[Updated_README_md.patch](..%2F..%2F..%2FDownloads%2FUpdated_README_md.patch)
            usePbxToken: false, // put true if PBX token is needed for your app
            visibleInUi: true, // put false if this integrtion should be displayed in x-bees UI
            devMode: true,
            description: // add description of your app
                'This integration allows you to do smth',
        },
    },
]))
```
