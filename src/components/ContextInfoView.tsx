import {useEffect, useState} from 'react';
import Loader from './Loader';
import {ContactQuery, ContactView} from './ContactView';
import {Box, Typography} from '@mui/material';
import Client from '@wildix/xbees-connect';

export type Message = {
  type?: string;
  message?: string;
  errorMessage?: string;
  payload?: unknown;
}

export const ContextInfoView = () => {
  const [page, setPage] = useState('loading');
  const [context, setContext] = useState<ContactQuery | null>(null);

  useEffect(() => {
    async function getContextData() {
      const contextMessage: Message = await Client.getInstance().getContext();

      if (contextMessage?.payload) {
        setPage('contact'); // show the component correspondent to the context
        setContext(contextMessage.payload);
      }
    }

    void getContextData();
  }, []);

  return (
    <>
      <br />
      <Typography variant="caption" fontWeight="bold">Current x-bees context:</Typography>
      <Box sx={{mt: 1}}>
        {(() => {
        const query = context;

        switch (page) {
          case 'contact':
            return <ContactView query={query!} />;
          case 'loading':
          default:
            return <Loader />;
        }
      })()}
      </Box>
    </>
);
}
