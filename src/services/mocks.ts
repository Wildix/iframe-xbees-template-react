import {Contact} from '@wildix/xbees-connect/dist-types/src/types';
import {ContactQuery} from '../components/ContactView';

const RESPONSE_DELAY = 500;

const delayResponse = <T>(result: T) => new Promise<T>((promiseResolve) => {
    setTimeout(() => promiseResolve(result), RESPONSE_DELAY);
});

export function fetchContactData(data: ContactQuery) {
  console.log('fetchContactData', {data});

  return delayResponse({
    name: 'Test User',
    email: data.contactEmail,
    phone: data.contactPhone,
  } as Contact)
}

export function suggestContacts(query: string) {
    const resultContactsList = [
        {id: 't0', name: `Test Mike1 (${query})`, email: 't0@smile.com', phone: '+123 313131221'},
        {id: 't1', name: `Test Jim (${query})`, email: 't1@smile.com', phone: '+123 213131123'}
    ];

  return delayResponse(resultContactsList)
}
