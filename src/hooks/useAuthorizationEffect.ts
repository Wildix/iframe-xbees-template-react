import {useEffect} from 'react';
import Client from '@wildix/xbees-connect';
import {useUserContext} from '../contexts/UserContext';

export function useAuthorizationEffect() {
  const [user] = useUserContext();

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
