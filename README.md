# x-bees iFrame Integration Template

This template provides minimal setup instructions that enable iFrame integration inside x-bees.

## Table of Contents

- [Setup](#setup)
- [Development](#development)
  - [Quick Start](#quick-start)
  - [Integrate with x-bees](#integrate-with-x-bees)
  - [x-bees - iFrame Communication Library](#x-bees---iframe-communication-library)
    - [xbees-connect Installation](#xbees-connect-installation)
    - [xbees-connect Usage](#xbees-connect-usage)
    - [xbees-connect-react Installation](#xbees-connect-react-installation)
    - [xbees-connect-react Usage](#xbees-connect-react-usage)
  - [Add Integration to the Development Playground](#add-integration-to-the-development-playground)

## Setup

To set up a demo:

1. **Download the template project**
2. **Install dependencies:** `yarn install`
3. **Build the project:** `yarn build`
4. **Deploy:** Deploy the content of the _**./build**_ folder to the frontend environment.
5. **Configure x-bees:** Use the URL of the integration application from step 4 when setting up a new iFrame integration in `WMS Settings -> PBX -> Integrations -> x-bees -> iFrame integrations -> Add integration -> iFrame URL field`

## Development

### Quick Start

1. **Download a copy of the template project**
2. **Install dependencies:** `yarn install`
3. **Run the template:** `yarn dev`
4. **Implement components and integration logic:** Customize the template for your integration

### Integrate with x-bees
If you want to integrate your local environment for testing purposes during development, you may need to expose your project URL for x-bees to access. To do this, follow these steps:
- Use NGROK for tunneling ([setup](https://ngrok.com/download))
- Run `ngrok http 5173` 
- Open the x-bees web app and configure x-bees integrations by adding your temporary integration locally

### x-bees - iFrame Communication Library

Ensure that you are using the latest version of the [xbees-connect library](https://www.npmjs.com/package/@wildix/xbees-connect) and [xbees-connect-react library](https://www.npmjs.com/package/@wildix/xbees-connect-react). 

#### xbees-connect Installation

Install the package in your project directory with:

```bash
yarn add @wildix/xbees-connect
```

#### xbees-connect Usage

```js
import Client from "@wildix/xbees-connect";

const xBeesClient = Client.getInstance();

console.log(xBeesClient.version());
```

#### xbees-connect-react Installation

Install the package in your project directory with:

```bash
yarn add @wildix/xbees-connect-react
```

#### xbees-connect-react Usage

```jsx
import { useThemeEffect, useViewPortEffect } from '@wildix/xbees-connect-react';

const AppUi = () => {
  const theme = useThemeEffect();

  useViewPortEffect();

  return (
    <div className="container">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div />
      </ThemeProvider>
    </div>
  );
};
```

### Add Integration to the Development Playground

To save additional test integrations for local testing in the browser console, use the following command:

```js
localStorage.setItem('iframeIntegrationsMock', JSON.stringify([ ...<put iFrameIntegration objects here> ]))
```

To display integrations in development mode, use the command:

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
        integrationId: 'test-iframeIntegrationsMock', // can be changed to any unique value
        externalId: 'it_iframe_test',
        service: 'iframe_integration', // this shouldn't be changed
        data: {
            iframeUrl: 'https://<some domain>.ngrok-free.app', // this should be changed to your iframe URL
            title: 'Integration title', // can be changed to any name
            usePbxToken: false, // put true if PBX token is needed for your app
            visibleInUi: true, // put false if this integration should not be displayed in x-bees UI
            devMode: true,
            description: // add description of your app
                'This integration allows you to do something',
        },
    },
]))
```
