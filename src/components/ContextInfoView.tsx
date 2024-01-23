import {useEffect, useState} from 'react';
import Loader from './Loader';
import {ContactView} from './ContactView';
import {Box, Typography} from '@mui/material';
import Client from '@wildix/xbees-connect';
import {Contact, ContactQuery} from '@wildix/xbees-connect/dist-types/types';
import {searchContactsBy} from '../api/searchContactsBy';
import {ContactEmpty} from './ContactEmpty';
import {ContactEdit} from './ContactEdit';
import {Navigate, Route, Routes, useNavigate} from 'react-router-dom';
import {useUserContext} from '../contexts/UserContext';
import {Paths} from '../roots';
import Env from '../Env';

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
        navigate(!resultContact ? Paths.NO_MATCHES_VIEW : `${resultContact.id}`)
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
      <Typography variant="subtitle1" fontWeight="bold">{`welcome v${Env.appVersion}`}</Typography>
      <Typography variant="body2">{`${user!.email}`}</Typography>
      <Box sx={{mt: 1}}>
        <Typography variant="subtitle2" fontWeight="bold">Current x-bees context:</Typography>
        <Routes>
          <Route index element={<Navigate to="loading" replace />} />
          <Route path=":id">
            <Route index element={<ContactView contact={contact!} edit={() => navigate(Paths.CREATE_CONTACT)} />} />
          </Route>
          <Route
            path={Paths.CREATE_CONTACT}
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
          <Route path={Paths.NO_MATCHES_VIEW} element={<ContactEmpty query={context!} create={() => navigate(Paths.CREATE_CONTACT)} />} />
          <Route path="loading" element={<Loader />} />
        </Routes>
      </Box>
    </>
  );
}
