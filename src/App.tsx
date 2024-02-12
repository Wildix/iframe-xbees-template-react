import './App.css'
import {ViewsContainer} from './components/ViewsContainer';
import {CssBaseline, ThemeProvider} from '@mui/material';
import {useThemeEffect, useViewPortEffect} from '@wildix/xbees-connect-react';
import {UserContext, UserContextState} from './contexts/UserContext';
import Auth from './auth';
import {useMemo, useState} from 'react';

function App() {
  const [user, setUser] = useState(Auth.getInstance().user);
  const {theme} = useThemeEffect();
  useViewPortEffect();

  const userContext: UserContextState = useMemo(() => [user, setUser], [user]);

  return (
    <div className="container">
      <UserContext.Provider value={userContext}>
        <ThemeProvider theme={theme}>
          <CssBaseline enableColorScheme />
          <ViewsContainer />
        </ThemeProvider>
      </UserContext.Provider>
    </div>
  )
}

export default App
