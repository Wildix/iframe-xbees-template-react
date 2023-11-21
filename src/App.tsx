import {initialUserState, UserContext} from './contexts/UserContext';
import {lazy, Suspense, useState} from 'react';
import Loader from './components/Loader';
import Client from '@wildix/xbees-connect';
import {IntegrationConnect} from './components/IntegrationConnect';

const AppUi = lazy(() => import('./AppUi'));

function App() {
  const userState = useState(initialUserState);

  const showUi = Client.getInstance().showsUi();

  return (
    <UserContext.Provider value={userState}>
      <IntegrationConnect />
      {showUi ? (
        <Suspense fallback={<Loader />}>
          <AppUi />
        </Suspense>
      ) : null}
    </UserContext.Provider>
  )
}

export default App
