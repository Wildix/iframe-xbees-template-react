import {useEffect, useState} from 'react';
import {Navigate, Route, Routes, useNavigate} from 'react-router-dom';

import Client, {StartPage} from '@wildix/xbees-connect';
import {Contact, ContactQuery} from '@wildix/xbees-connect/dist-types/types';

import {Box, Typography} from '@mui/material';

import {searchContactsBy} from '../api/searchContactsBy';
import {Paths} from '../app/router/enums';
import Loader from '../components/Loader';
import {useUserContext} from '../contexts/UserContext';
import Env from '../Env';
import {ContactDetails} from '../modules/contact/views/ContactDetails';
import {ContactEdit} from '../modules/contact/views/ContactEdit';
import {ContactEmpty} from '../modules/contact/views/ContactEmpty';

export function ContactInfo() {
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
    let active = true;

    async function getContextData(query: ContactQuery) {
      let resultContact: Contact | null = null;

      try {
        const results = await searchContactsBy(query);
        if (!active) {
          return;
        }

        resultContact = results?.[0] ?? null;
        setContact(resultContact);
        setIsUpdated(false);

        if (resultContact) {
          void Client.getInstance().contactUpdated(query, resultContact);
        }
      } finally {
        if (active) {
          const noMatchesView =
            Client.getInstance().getStartPage() === StartPage.CREATE_CONTACT
              ? Paths.CREATE_CONTACT
              : Paths.NO_MATCHES_VIEW;
          navigate(`/${Paths.CONTACT_VIEW}/${!resultContact ? noMatchesView : resultContact.id}`);
        }
      }
    }

    if (context) {
      void getContextData(context);
    }

    return () => {
      active = false;
    };
  }, [context, isUpdated]);

  useEffect(() => {
    if (contact) {
      navigate(`/${Paths.CONTACT_VIEW}/${contact.id}`);
    }
  }, [contact]);

  return (
    <>
      <Typography variant="subtitle1" fontWeight="bold">{`welcome v${Env.appVersion}`}</Typography>
      <Typography variant="subtitle1" fontWeight="bold">{`product: ${Client.getInstance().getProduct()}`}</Typography>
      <Typography variant="body2">{`${user!.email}`}</Typography>
      <Box sx={{mt: 1}}>
        <Typography variant="subtitle2" fontWeight="bold">
          Current x-bees context:
        </Typography>
        <Routes>
          <Route index element={<Navigate to="loading" replace />} />
          <Route path=":id">
            <Route
              index
              element={
                contact ? (
                  <ContactDetails
                    contact={contact}
                    edit={() => navigate(`/${Paths.CONTACT_VIEW}/${Paths.CREATE_CONTACT}`)}
                  />
                ) : (
                  <Loader />
                )
              }
            />
          </Route>
          <Route
            path={Paths.CREATE_CONTACT}
            element={
              <ContactEdit
                query={context!}
                contact={contact}
                onCreate={() => {
                  setContext({...context!});
                  navigate(`/${Paths.CONTACT_VIEW}/loading`);
                  setIsUpdated(true);
                }}
              />
            }
          />
          <Route
            path={Paths.NO_MATCHES_VIEW}
            element={
              <ContactEmpty
                query={context!}
                create={() => navigate(`/${Paths.CONTACT_VIEW}/${Paths.CREATE_CONTACT}`)}
              />
            }
          />
          <Route path="loading" element={<Loader />} />
        </Routes>
      </Box>
    </>
  );
}
