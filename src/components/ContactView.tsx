import DetailsProperty from './DetailsProperty';
import {Box, Button, Divider, IconButton, Stack, Typography} from '@mui/material';
import LogoutIcon from '../assets/icons/LogoutIcon';
import {useUserContext} from '../contexts/UserContext';
import Client from '@wildix/xbees-connect';
import {Contact} from '@wildix/xbees-connect/dist-types/types';

interface ContactViewProps {
    contact: Contact,
    edit: () => void
}

export function ContactView({contact, edit}: ContactViewProps) {

  function startCall(phoneNumber: string) {
    return Client.getInstance().startCall(phoneNumber);
  }

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
      <DetailsProperty title="Name" value={contact.name} />
      {contact.email ? <DetailsProperty title="email" value={contact.email} variant="email" /> : null}
      {contact.phone ? (
        <DetailsProperty
          title="phone"
          value={contact.phone}
          variant="phone"
          onClick={() => startCall(contact.phone!)}
        />
) : null}
      <br />
      <Button onClick={edit}>Edit contact</Button>
      <br />
      <Divider />
      <br />
      <Typography variant="caption">
        Edit
        {' '}
        <code>src/components/ContactView.tsx</code>
        {' '}
        and save to test
      </Typography>
    </Stack>
  );
}
