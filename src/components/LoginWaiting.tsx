import {useEffect, useState} from 'react';
import {Box, CircularProgress, Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';

const awaiting = 'Still waiting for your authentication process to proceed. If you encounter any difficulties, feel free to close this popup and initiate the process anew or seek assistance.'
const tokens = 'Token acquisition in progress. Please await completion.'

export function LoginWaiting() {
  const [showAwaitingNotification, setShowNotification] = useState<string | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const timeoutId1 = setTimeout(() => {
      setShowNotification(awaiting);
    }, 1000);

    const timeoutId2 = setTimeout(() => {
      setShowNotification(tokens);
    }, 2000);

    const timeoutId3 = setTimeout(() => {
      navigate('/');
    }, 3000);

    return () => {
      clearTimeout(timeoutId1);
      clearTimeout(timeoutId2);
      clearTimeout(timeoutId3);
    }
  }, []);

  return (
    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, p: 5}}>
      <CircularProgress />
      {showAwaitingNotification ? (
        <Box>
          <Typography variant="body1">
            {showAwaitingNotification}
          </Typography>
        </Box>
      ) : null}
    </Box>
  );
}
