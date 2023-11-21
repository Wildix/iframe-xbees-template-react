import xBeesLogo from '/logo.png'
import {Login} from './Login';
import {Stack} from '@mui/material';

export function Welcome() {
  return (
    <Stack alignItems="center" sx={{width: '100%'}}>
      <div>
        <a href="https://github.com/wildix/" target="_blank" rel="noreferrer">
          <img src={xBeesLogo} className="logo" alt="x-bees logo" />
        </a>
      </div>
      <Login />
      <p className="read-the-docs">
        Click on the x-bees logo to learn more
      </p>
    </Stack>
  );
}
