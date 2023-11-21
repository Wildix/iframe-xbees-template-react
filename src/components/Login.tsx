import {useUserContext} from '../contexts/UserContext';
import {Box, Button, Stack, Typography} from '@mui/material';

type CredentialResponse = {
    email: string;
}

type User = {
    name: string,
    email: string,
}

const credentialsMock: CredentialResponse = {
    email: 'john.doe@test.cc'
}

const userMock: User = {
    name: 'John Doe',
    email: 'john.doe@test.cc'
}

function getUserFromCredentials(credentialResponse: CredentialResponse) {
    return credentialResponse ? userMock : null;
}

export function Login() {
  const [, setUser] = useUserContext();

  const onSuccess = (credentialResponse: CredentialResponse) => {
    const user = getUserFromCredentials(credentialResponse)
    setUser(user);
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
