import Env from './Env';
import Client from '@wildix/xbees-connect';
import {Contact} from '@wildix/xbees-connect/dist-types/types';
import {searchContactsBy} from './api/searchContactsBy';
import Auth from './auth';
import ContactsRepository from './mocks/ContactsRepository';

async function lazyUiRenderer() {
    try {
        const {renderReact} = await import('./reactRender');
        renderReact();
    } catch (error) {
        console.error('Error rendering widget:', error);
    }
}

addEventListener('storage', (storageEvent) => {
    if (storageEvent.key === 'user') {
        Auth.refreshFromStorage()
    }

    if (storageEvent.key === 'contacts') {
        ContactsRepository.getInstance().refreshFromStorage()
    }
});

(async () => {
    await Env.beforeStart();

    Client.initialize(lazyUiRenderer);

    Client.getInstance().onSuggestContacts(async (query, resolve, reject) => {
        if (!Auth.getInstance().isAuthorized()) {
            return Client.getInstance().isNotAuthorized()
        }

        try {
            const contacts = await searchContactsBy(query);

            if (contacts) {
                resolve(contacts
                    .map((user) => ({
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        phone: user.phone
                    } as Contact)))
            }
        } catch (error) {
            reject(`${error}`)
        }
    });

    Client.getInstance().onLookupAndMatchContact(async (query, resolve, reject) => {
        if (!Auth.getInstance().isAuthorized()) {
            return Client.getInstance().isNotAuthorized()
        }

        try {
            const contacts = await searchContactsBy(query);

            if (contacts && contacts.length > 0) {
                const contact = contacts[0]!;
                resolve(({
                    id: contact.id,
                    name: contact.name,
                    email: contact.email,
                    phone: contact.phone
                } as Contact))
            }
        } catch (error) {
            reject(`${error}`)
        }
    });

    Client.getInstance().ready();

    if (!Auth.getInstance().isAuthorized()) {
      Client.getInstance().isNotAuthorized()
    } else {
      Client.getInstance().isAuthorized()
    }
})();


