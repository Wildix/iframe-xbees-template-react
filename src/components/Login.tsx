import {useUserContext} from '../contexts/UserContext';
import {Box, Button, Stack, Typography} from '@mui/material';
import {User} from '../types';
import Auth from '../auth';
import Client from '@wildix/xbees-connect';

type CredentialResponse = {
    email: string;
}

const credentialsMock: CredentialResponse = {
    email: Client.getInstance().getUserEmail()
}

function getUserFromCredentials(credentialResponse: CredentialResponse): User {
  const {email} = credentialResponse
  const name = email.split('@')[0] ?? email;

  return {
    name,
    email
  };
}

export function Login() {
  const [, setUser] = useUserContext();

  const onSuccess = (credentialResponse: CredentialResponse) => {
    const user = getUserFromCredentials(credentialResponse)
    setUser(user);
    Auth.getInstance().user = user;
    localStorage.setItem('user', JSON.stringify(user))
  };

  return (
    <Stack spacing={1} alignItems="center">
      <Typography variant="h6" align="center">
        Want to connect with your X-Application?
        <br />
        Please Sign in
      </Typography>
      <Box sx={{mt: 1}}>
        <Button variant="contained" onClick={() => onSuccess(credentialsMock)}>
          Login
        </Button>
      </Box>
      <Typography variant="caption" align="center">
        Edit
        {' '}
        <code>src/components/Login.tsx</code>
        {' '}
        and save to test
      </Typography>
    </Stack>
  );
}
