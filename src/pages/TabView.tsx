import {useEffect, useState} from 'react';

import {Box, Divider, Stack, Typography} from '@mui/material';

import {Contact} from '@wildix/xbees-connect/dist-types/types';

import {searchContactsBy} from '../api/searchContactsBy';
import Loader from '../components/Loader';
import Env from '../Env';
import {LogoutButton} from '../modules/login/components/LogoutButton';

export function TabView() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadContacts() {
      try {
        const results = await searchContactsBy('');
        setContacts(results ?? []);
      } finally {
        setIsLoading(false);
      }
    }

    void loadContacts();
  }, []);

  const hasContacts = contacts.length > 0;

  return (
    <Stack spacing={2}>
      <LogoutButton />
      <Typography variant="h6" fontWeight="bold">
        Template - Tab View
      </Typography>
      <Typography variant="subtitle1" fontWeight="bold">{`welcome v${Env.appVersion}`}</Typography>

      {isLoading ? (
        <Loader />
      ) : hasContacts ? (
        <Stack spacing={1.5}>
          {contacts.map((contact) => (
            <Box
              key={contact.id}
              sx={{
                p: 1.5,
                borderRadius: 1,
                border: '1px solid',
                borderColor: 'divider',
              }}>
              <Typography variant="subtitle1" fontWeight="bold">
                {contact.name}
              </Typography>
              {contact.email ? (
                <Typography variant="body2" color="text.secondary">
                  {contact.email}
                </Typography>
              ) : null}
              {contact.phone ? (
                <Typography variant="body2" color="text.secondary">
                  {contact.phone}
                </Typography>
              ) : null}
            </Box>
          ))}
        </Stack>
      ) : (
        <Box>
          <Typography variant="body2">No contacts available</Typography>
          <Divider sx={{mt: 1}} />
        </Box>
      )}
    </Stack>
  );
}
