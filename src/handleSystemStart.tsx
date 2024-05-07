import Client from '@wildix/xbees-connect';
import {Contact} from '@wildix/xbees-connect/dist-types/types';

import {searchContactsBy} from './api/searchContactsBy';
import Auth from './auth';
import Env from './Env';
import {lazyUiRenderer} from './lazyUiRenderer';

export const handleSystemStart = async () => {
  await Env.beforeStart();

  Client.initialize(lazyUiRenderer);

  Client.getInstance().onSuggestContacts(async (query, resolve, reject) => {
    if (!Auth.getInstance().isAuthorized()) {
      return Client.getInstance().isNotAuthorized();
    }

    try {
      const contacts = await searchContactsBy(query);

      if (contacts) {
        resolve(
          contacts.map(
            (user) =>
              ({
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
              }) as Contact,
          ),
        );
      }
    } catch (error) {
      reject(`${error}`);
    }
  });

  Client.getInstance().onLookupAndMatchContact(async (query, resolve, reject) => {
    if (!Auth.getInstance().isAuthorized()) {
      return Client.getInstance().isNotAuthorized();
    }

    try {
      const contacts = await searchContactsBy(query);

      if (contacts && contacts.length > 0) {
        const contact = contacts[0]!;
        resolve({
          id: contact.id,
          name: contact.name,
          email: contact.email,
          phone: contact.phone,
        } as Contact);
      } else {
        throw Error('not found');
      }
    } catch (error) {
      reject(`${error}`);
    }
  });

  Client.getInstance().ready();

  if (!Auth.getInstance().isAuthorized()) {
    Client.getInstance().isNotAuthorized();
  } else {
    Client.getInstance().isAuthorized();
  }
};
