import {useEffect, useState} from "react";
import connectProvider from "../helpers/connectProvider";
import Loader from "./Loader";
import {ContactView} from "./ContactView";

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
      const contextMessage: Message = await connectProvider().getContext();

      if (contextMessage?.payload) {
        setPage("contact"); // show the component correspondent to the context
        setContext(contextMessage.payload);
      }
    }

    void getContextData();
  }, []);

  return <>
    <h3>Current X-Bees context:</h3>
    <div className="card">
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
      <p>
        Edit <code>src/components/ContextInfoView.tsx</code> and save to test
      </p>
    </div>
  </>;
}
