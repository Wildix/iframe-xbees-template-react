import {useEffect} from 'react';
import {useUserContext} from '../contexts/UserContext';
import Client from '@wildix/xbees-connect';
import {suggestContacts} from '../services/mocks';

export default function useFetchContactsByQuery() {
  const [user] = useUserContext();

  useEffect(() => {
    const connect = Client.getInstance();

    if (!user) {
      return void connect?.isNotAuthorized?.();
    }

    return connect.onSuggestContacts(async (query, resolve, reject) => {
      try {
        const responseResult = await suggestContacts(query)
        resolve(responseResult!)
      } catch (error) {
        reject(`${error}`)
      }
    });
  }, [user])

}
