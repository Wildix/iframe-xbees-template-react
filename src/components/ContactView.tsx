import {useEffect, useState} from 'react';
import Loader from './Loader';
import DetailsProperty from './DetailsProperty';
import {Box, Divider, IconButton, Stack, Typography} from '@mui/material';
import LogoutIcon from '../assets/icons/LogoutIcon';
import {useUserContext} from '../contexts/UserContext';
import Client from '@wildix/xbees-connect';
import {fetchContactData} from '../services/mocks';
import {Contact} from '@wildix/xbees-connect/dist-types/src/types';

export type ContactQuery = { contactEmail?: string, contactPhone?: string | number };

interface ContactViewProps {
  query: ContactQuery
}

export function ContactView({query}: ContactViewProps) {
  const [contact, setContact] = useState<Contact | null>(null);

  useEffect(() => {
    async function getContextData() {
      const newVar = await fetchContactData(query);
      setContact(newVar);
    }

    void getContextData();
  }, [query]);

  function startCall(phoneNumber: string) {
    return Client.getInstance().startCall(phoneNumber);
  }

  const [, setUser] = useUserContext();

  const onLogoutClick = () => {
    setUser(null);
    localStorage.removeItem('user');
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
      {contact ? (
        <>
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
        </>
      ) : <Loader />}
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
