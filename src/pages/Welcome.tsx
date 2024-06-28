import {Navigate, Outlet} from 'react-router-dom';

import {Box, Stack} from '@mui/material';

import {Paths} from '../app/router/enums';
import {useUserContext} from '../contexts/UserContext';
import Env from '../Env';

import xBeesLogo from '/logo.png';

export function Welcome() {
  const [user] = useUserContext();

  if (user) {
    return <Navigate to={Paths.CONTACT_VIEW} replace />;
  }

  return (
    <Stack alignItems="center" sx={{width: '100%'}}>
      <Box>
        <a href="https://github.com/wildix/" target="_blank" rel="noreferrer">
          <img src={xBeesLogo} className="logo" alt="x-bees logo" style={{width: 200, height: 'auto'}} />
        </a>
      </Box>
      <Outlet />
      <caption className="read-the-docs">Click on the x-bees logo to learn more</caption>
      <caption className="read-the-docs">{`v${Env.appVersion}`}</caption>
    </Stack>
  );
}
