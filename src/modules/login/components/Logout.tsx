import {useEffect} from 'react';
import {Navigate} from 'react-router-dom';

import {PublicPaths} from '../../../app/router/enums';
import {useUserContext} from '../../../contexts/UserContext';
import {onLogout} from '../../../helpers/onLogout';

export const Logout = () => {
  const [, setUser] = useUserContext();

  useEffect(() => {
    setUser(null);
    onLogout();
  }, [setUser]);

  return <Navigate to={PublicPaths.ROOT} replace />;
};
