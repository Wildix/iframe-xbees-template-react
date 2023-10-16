import {useEffect, useState} from "react";
import xBeesConnect from "../helpers/xBeesConnect";
import Loader from "./Loader";
import {ContactView} from "./ContactView";
import {Box, Typography} from "@mui/material";

export type Message = {
  type?: string;
  message?: string;
  errorMessage?: string;
  payload?: any;
}

export function ContextInfoView() {
  const [page, setPage] = useState("loading");
  const [context, setContext] = useState<unknown>(null);

  useEffect(() => {
    async function getContextData() {
      const contextMessage: Message = await xBeesConnect().getContext();

      if (contextMessage?.payload) {
        setPage("contact"); // show the component correspondent to the context
        setContext(contextMessage.payload);
      }
    }

    void getContextData();
  }, []);

  return <>
    <br/>
    <Typography variant="caption" fontWeight="bold">Current x-bees context:</Typography>
    <Box sx={{mt: 1}}>
      {(() => {
        const query: any = context;
        switch (page) {
          case 'contact':
            return <ContactView query={query}/>;
          case 'loading':
          default:
            return <Loader />;
        }
      })()}
    </Box>
  </>;
}
