import {Box, Button, Divider, IconButton, Stack, Typography} from '@mui/material';
import LogoutIcon from '../assets/icons/LogoutIcon';
import {useUserContext} from '../contexts/UserContext';
import {ContactQuery} from '@wildix/xbees-connect/dist-types/types';
import Client from '@wildix/xbees-connect';

interface ContactViewProps {
    query: ContactQuery,
    create: () => void,
}

export function ContactEmpty({query, create}: ContactViewProps) {

  const [, setUser] = useUserContext();

  const onLogoutClick = () => {
    setUser(null);
    Client.getInstance().deleteFromStorage('user');
  };

  return (
    <Stack>
      <Box sx={{position: 'absolute', top: 10, right: 10}}>
        <IconButton onClick={onLogoutClick}>
          <LogoutIcon
            color="black"
          />
        </IconButton>
      </Box>
      <Typography variant="subtitle1">There is no contact for</Typography>
      {query.email ? <Typography variant="body1">{query.email}</Typography> : null}
      {query.phone ? <Typography variant="body1">{query.phone}</Typography> : null}
      <Button onClick={create}>Create contact</Button>
      <br />
      <Divider />
      <br />
      <Typography variant="caption">
        Edit
        {' '}
        <code>src/components/ContactEmpty.tsx</code>
        {' '}
        and save to test
      </Typography>
    </Stack>
  );
}
