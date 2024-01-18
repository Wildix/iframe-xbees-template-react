import {Button, Divider, Stack, Typography} from '@mui/material';
import {ContactQuery} from '@wildix/xbees-connect/dist-types/types';
import {LogoutButton} from './LogoutButton';

interface ContactViewProps {
    query: ContactQuery,
    create: () => void,
}

export function ContactEmpty({query, create}: ContactViewProps) {
  return (
    <Stack>
      <LogoutButton />
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
