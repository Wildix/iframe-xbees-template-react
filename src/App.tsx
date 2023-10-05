import {initialUserState, UserContext} from "./contexts/UserContext";
import {Suspense, useState} from "react";
import {IntegrationConnect} from "./components/IntegrationConnect";
import {useSearchParams} from "./hooks/useSearchParams.ts";
import Loader from "./components/Loader.tsx";
import { lazy } from 'react';

const AppUi = lazy(() => import('./AppUi'));

function App() {
  const userState = useState(initialUserState);
  const searchParams = useSearchParams();

  const showUi = !searchParams.has('daemon');
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
