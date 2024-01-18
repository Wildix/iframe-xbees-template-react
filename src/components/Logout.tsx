import {useUserContext} from '../contexts/UserContext';
import {useEffect} from 'react';
import Client from '@wildix/xbees-connect';
import {Navigate} from 'react-router-dom';
import {PublicPaths} from './ViewsContainer';

export const Logout = () => {
  const [, setUser] = useUserContext();

  useEffect(() => {
    setUser(null);
    Client.getInstance().deleteFromStorage('user');
  }, [setUser]);

  return <Navigate to={PublicPaths.root} replace />
};
