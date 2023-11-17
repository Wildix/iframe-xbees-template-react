import './App.css'
import {ViewsContainer} from './components/ViewsContainer';
import {CssBaseline, ThemeProvider} from '@mui/material';
import {useThemeEffect, useViewPortEffect} from '@wildix/xbees-connect-react';

const AppUi = () => {
  const theme = useThemeEffect();

  useViewPortEffect();

  return (
    <div className="container">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ViewsContainer />
      </ThemeProvider>
    </div>
  )
}

export default AppUi
