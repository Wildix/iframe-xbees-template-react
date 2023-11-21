import {useEffect} from 'react';
import Client from '@wildix/xbees-connect';
import {useUserContext} from '../contexts/UserContext';

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
  }, [user]);
}
