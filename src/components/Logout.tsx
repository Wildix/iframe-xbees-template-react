import {useEffect} from 'react';
import {Navigate} from 'react-router-dom';

import Client from '@wildix/xbees-connect';

import {useUserContext} from '../contexts/UserContext';
import {PublicPaths} from '../roots';

export const Logout = () => {
  const [, setUser] = useUserContext();

  useEffect(() => {
    setUser(null);
    Client.getInstance().deleteFromStorage('user');
  }, [setUser]);

  return <Navigate to={PublicPaths.ROOT} replace />;
};
