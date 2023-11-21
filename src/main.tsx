import Client from '@wildix/xbees-connect';
import {suggestContacts} from './services/mocks';

Client.initialize(async () => {
    try {
        const { renderReact } = await import('./reactRender');
        renderReact();
    } catch (error) {
        console.error('Error rendering widget:', error);
    }
});

Client.getInstance().onSuggestContacts(async (query, resolve, reject) => {
  try {
    const responseResult = await suggestContacts(query)
    resolve(responseResult)
  } catch (error) {
    reject(`${error}`)
  }
});

console.debug(APP_NAME, APP_VERSION);
