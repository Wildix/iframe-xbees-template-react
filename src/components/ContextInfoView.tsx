import {useEffect, useState} from 'react';
import Loader from './Loader';
import {ContactView} from './ContactView';
import {Box, Typography} from '@mui/material';
import Client from '@wildix/xbees-connect';
import {Contact, ContactQuery} from '@wildix/xbees-connect/dist-types/types';
import {searchContactsBy} from '../api/searchContactsBy';
import {ContactEmpty} from './ContactEmpty';
import {ContactEdit} from './ContactEdit';
import {Link as RouterLink, Navigate, Route, Routes, useNavigate} from 'react-router-dom';
import {Paths} from './ViewsContainer';
import {useUserContext} from '../contexts/UserContext';
import Link from '@mui/material/Link';

export function ContextInfoView() {
  const navigate = useNavigate();
  const [user] = useUserContext();
  const [context, setContext] = useState<ContactQuery | null>(null);
  const [contact, setContact] = useState<Contact | null>(null);
  const [isUpdated, setIsUpdated] = useState<boolean>(false);

  useEffect(() => {
    async function getContextData() {
      const contextMessage = await Client.getInstance().getContext();

      if (contextMessage?.payload) {
        setContext(contextMessage.payload.contact);
      }
    }

    void getContextData();
  }, []);

  useEffect(() => {
    async function getContextData(query: ContactQuery) {
      let resultContact: Contact | null = null;

      try {
        const results = await searchContactsBy(query);
        resultContact = results?.[0] ?? null;
        setContact(resultContact);
        setIsUpdated(false);

        if (resultContact) {
          void Client.getInstance().contactUpdated(query, resultContact);
        }
      } finally {
        navigate(!resultContact ? Paths.no_matches_view : `${resultContact.id}`)
      }
    }

    if (context) {
      void getContextData(context);
    }
  }, [context, isUpdated]);

  useEffect(() => {
    if (contact) {
      navigate(contact.id)
    }
  }, [contact]);

  return (
    <>
      <br />
      <Typography variant="subtitle1">welcome</Typography>
      <Typography variant="body2">{`${user!.name} (${user!.email})`}</Typography>
      <br />
      <Typography variant="caption" fontWeight="bold">Current x-bees context:</Typography>
      <Box sx={{mt: 1}}>
        <Routes>
          <Route index element={<Navigate to="loading" replace />} />
          <Route path=":id">
            <Route index element={<ContactView contact={contact!} edit={() => navigate(Paths.create_contact)} />} />
          </Route>
          <Route
            path={Paths.create_contact}
            element={(
              <ContactEdit
                query={context!}
                contact={contact}
                onCreate={() => {
                  setContext({...context!});
                  navigate('loading');
                  setIsUpdated(true);
                }}
              />
            )}
          />
          <Route path={Paths.no_matches_view} element={<ContactEmpty query={context!} create={() => navigate(Paths.create_contact)} />} />
          <Route path="loading" element={<Loader />} />
        </Routes>
      </Box>
      <Link variant="subtitle1" component={RouterLink} to={`/${Paths.toasts_view}`}>Test Toasts</Link>
    </>
  );
}
