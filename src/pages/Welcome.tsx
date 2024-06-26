import {Navigate, Outlet} from 'react-router-dom';

import {Stack} from '@mui/material';

import {useUserContext} from '../contexts/UserContext';
import {Paths} from '../enums';
import Env from '../Env';

import xBeesLogo from '/logo.png';

export function Welcome() {
  const [user] = useUserContext();

  if (user) {
    return <Navigate to={Paths.CONTACT_VIEW} replace />;
  }

  return (
    <Stack alignItems="center" sx={{width: '100%'}}>
      <div>
        <a href="https://github.com/wildix/" target="_blank" rel="noreferrer">
          <img src={xBeesLogo} className="logo" alt="x-bees logo" />
        </a>
      </div>
      <Outlet />
      <caption className="read-the-docs">Click on the x-bees logo to learn more</caption>
      <caption className="read-the-docs">{`v${Env.appVersion}`}</caption>
    </Stack>
  );
}
