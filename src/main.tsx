import Client from '@wildix/xbees-connect';

import Auth from './auth';
import {handleSystemStart} from './handleSystemStart';
import ContactsRepository from './mocks/ContactsRepository';

Client.getInstance().onStorage((storageEvent) => {
  if (storageEvent.key === 'user') {
    Auth.refreshFromStorage();
  }

  if (storageEvent.key === 'contacts') {
    ContactsRepository.getInstance().refreshFromStorage();
  }
});

void handleSystemStart();
