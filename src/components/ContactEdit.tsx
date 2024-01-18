import {Button, Divider, Stack, TextField, Typography} from '@mui/material';
import {Contact, ContactQuery} from '@wildix/xbees-connect/dist-types/types';
import {useViewPortEffect} from '@wildix/xbees-connect-react';

import {addContact} from '../api/addContact';
import {LogoutButton} from './LogoutButton';

interface ContactEditProps {
    query: ContactQuery,
    contact?: Contact | null,
    onCreate: () => void,
}

export function ContactEdit({query, contact, onCreate}: ContactEditProps) {

  useViewPortEffect();

  return (
    <Stack>
      <LogoutButton />
      <Typography variant="subtitle1">Create new contact for</Typography>
      {query.email ? <Typography variant="body1">{query.email}</Typography> : null}
      {query.phone ? <Typography variant="body1">{query.phone}</Typography> : null}
      <br />
      <form
        id="contactForm"
        onSubmit={async (event) => {
          event.preventDefault();
          await addContact();
          onCreate();
        }}
      >
        <Stack direction="column" spacing={1.5}>
          <TextField
            required
            fullWidth
            size="small"
            name="name"
            label="Name"
            variant="outlined"
            defaultValue={contact?.name}
          />
          <TextField
            required
            fullWidth
            size="small"
            name="email"
            label="Email"
            variant="outlined"
            defaultValue={contact?.email ?? query.email}
          />
          <TextField
            required
            fullWidth
            size="small"
            name="phone"
            label="Phone"
            variant="outlined"
            defaultValue={contact?.phone ?? query.phone}
          />
          <div className="buttons">
            <Button type="submit" className="app-button" size="small" variant="contained">Create contact</Button>
          </div>
        </Stack>
      </form>
      <br />
      <Divider />
      <br />
      <Typography variant="caption">
        Edit
        {' '}
        <code>src/components/ContactEdit.tsx</code>
        {' '}
        and save to test
      </Typography>
    </Stack>
  );
}
