import {useUserContext} from '../contexts/UserContext';
import {useEffect} from 'react';
import Client from '@wildix/xbees-connect';
import {Navigate} from 'react-router-dom';

import {PublicPaths} from '../roots';

export const Logout = () => {
  const [, setUser] = useUserContext();

  useEffect(() => {
    setUser(null);
    Client.getInstance().deleteFromStorage('user');
  }, [setUser]);

  return <Navigate to={PublicPaths.ROOT} replace />
};
