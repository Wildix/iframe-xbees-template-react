import {useEffect, useState} from 'react';
import Loader from './Loader';
import {ContactView} from './ContactView';
import {Box, Typography} from '@mui/material';
import Client from '@wildix/xbees-connect';
import {Contact, ContactQuery} from '@wildix/xbees-connect/dist-types/types';
import {searchContactsBy} from '../api/searchContactsBy';
import {ContactEmpty} from './ContactEmpty';
import { ContactEdit } from './ContactEdit';

export type Message = {
  type?: string;
  message?: string;
  errorMessage?: string;
  payload?: unknown;
}

export function ContextInfoView() {
  const [page, setPage] = useState('loading');
  const [context, setContext] = useState<ContactQuery | null>(null);
  const [contact, setContact] = useState<Contact | null>(null);

  useEffect(() => {
    async function getContextData() {
      const contextMessage = await Client.getInstance().getContext();

      if (contextMessage?.payload) {
        setPage('loading'); // show the component correspondent to the context
        setContext(contextMessage.payload.contact);
      }
    }

    void getContextData();
  }, []);

  async function getContextData(query: ContactQuery) {
    setPage('loading')
    let resultContact: Contact | null = null;

    try {
      const results = await searchContactsBy(query);
      resultContact = results?.[0] ?? null;
      setContact(resultContact);
    } finally {
      setPage(!resultContact ? 'noContact' : 'contact')
    }
  }

  useEffect(() => {
    if (context) {
      void getContextData(context);
    }
  }, [context]);

  return (
    <>
      <br />
      <Typography variant="caption" fontWeight="bold">Current x-bees context:</Typography>
      <Box sx={{mt: 1}}>
        {(() => {
          const query = context;

          switch (page) {
            case 'contact':
              return <ContactView contact={contact!} edit={() => setPage('contactEdit')} />;
            case 'noContact':
              return <ContactEmpty query={query!} create={() => setPage('contactEdit')} />;
            case 'contactEdit':
              return (
                <ContactEdit
                  query={query!}
                  contact={contact}
                  onCreate={() => setContext({...context!})}
                />
              );
            case 'loading':
            default:
              return <Loader />;
          }
        })()}
      </Box>
    </>
  );
}
