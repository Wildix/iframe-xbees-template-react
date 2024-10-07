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
3. **Run the template:**
   - For local development without ngrok: `sudo yarn dev --host local.integrations.x-bees.com --port=443` change host <local.integrations.x-bees.com> or port
   - For testing with ngrok tunneling: `yarn dev`
4. **Implement components and integration logic:** Customize the template for your integration


### Integrate with x-bees

You have two options for integrating your local development environment with x-bees:

#### 1. Local Development

make sure mkcert is added
```bash
yarn add vite-plugin-mkcert -D
```
Configure [vite.config.ts](vite.config.ts)
```js
import {defineConfig} from'vite'
import mkcert from'vite-plugin-mkcert'

export default defineConfig({
    plugins: [mkcert()]
})
```
add domain to hosts file
```bash
sudo nano /etc/hosts
```
add row with
```
127.0.0.1    local.integrations.x-bees.com
```  
Run the local development server with domain mapping:
```bash
sudo yarn dev --host local.integrations.x-bees.com --port=443
```
In x-bees, configure a new iFrame integration using the URL: https://local.integrations.x-bees.com

#### 2. Using ngrok (Tunneling)

Set up ngrok (https://ngrok.com/download)
Run ngrok http 5173
In x-bees, configure a new iFrame integration using the ngrok-provided URL (e.g., https://<random-string>.ngrok.io)
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
