import DetailsProperty from './DetailsProperty';
import {Button, Divider, Stack, Typography} from '@mui/material';
import Client from '@wildix/xbees-connect';
import {Contact} from '@wildix/xbees-connect/dist-types/types';
import {LogoutButton} from './LogoutButton';

interface ContactViewProps {
    contact: Contact,
    edit: () => void
}

export function ContactView({contact, edit}: ContactViewProps) {
  function startCall(phoneNumber: string) {
    return Client.getInstance().startCall(phoneNumber);
  }

  return (
    <Stack>
      <LogoutButton />
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
