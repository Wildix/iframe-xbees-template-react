import {initialUserState, UserContext} from "./contexts/UserContext";
import {Suspense, useState} from "react";
import {IntegrationConnect} from "./components/IntegrationConnect";
import Loader from "./components/Loader.tsx";
import { lazy } from 'react';
import xBeesConnect from "@xbees/connect";

const AppUi = lazy(() => import('./AppUi'));

function App() {
  const userState = useState(initialUserState);

  const showUi = xBeesConnect().showsUi();
  return (
      <UserContext.Provider value={userState}>
        <IntegrationConnect />
        {showUi && (
          <Suspense fallback={<Loader />}>
            <AppUi />
          </Suspense>
        )}
      </UserContext.Provider>
  )
}

export default App
