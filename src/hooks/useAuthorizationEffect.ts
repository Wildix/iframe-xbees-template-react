import {useEffect} from 'react';
import Client from '@wildix/xbees-connect';
import {useUserContext} from '../contexts/UserContext';
import {EventType} from '@wildix/xbees-connect/dist-types/src/types';

export function useAuthorizationEffect() {
  const [user, setUser] = useUserContext();

  useEffect(() => {
    const listener = () => {
      const item = localStorage.getItem('user');
      const itemState = item && JSON.parse(item);
      setUser(itemState);
    };

    addEventListener('storage', listener);

    return () => removeEventListener('storage', listener);
  }, [setUser]);

  useEffect(() => {
    const connect = Client.getInstance();
    const isAuthorized = !!user;

    if (isAuthorized) {
      void connect?.isAuthorized?.();
    } else {
      void connect?.isNotAuthorized?.()
    }

    const listener = (event: { errorMessage?: string }) => {
      if (!user && !event.errorMessage) {
        void connect?.isNotAuthorized?.();
      }
    };

    // @ts-expect-error TODO: check the type for Callback<?>
    // connect.addEventListener(EventType.GET_CONTACTS_AUTO_SUGGEST, listener);
    connect.addEventListener('xBeesGetContactsAutoSuggest', listener);

    // @ts-expect-error TODO: check the type for Callback<?>
    return () => connect.off(listener)
  }, [user]);
}
