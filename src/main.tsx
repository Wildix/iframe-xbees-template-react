import Client from '@wildix/xbees-connect';
import Auth from './auth';
import ContactsRepository from './mocks/ContactsRepository';
import {handleSystemStart} from './handleSystemStart';

Client.getInstance().onStorage((storageEvent) => {
    if (storageEvent.key === 'user') {
        Auth.refreshFromStorage()
    }

    if (storageEvent.key === 'contacts') {
        ContactsRepository.getInstance().refreshFromStorage()
    }
});

void handleSystemStart();


