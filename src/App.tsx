import './App.css'
import {initialUserState, UserContext} from "./contexts/UserContext";
import {useEffect, useState} from "react";
import {IntegrationConnect} from "./components/IntegrationConnect";
import {ViewsContainer} from "./components/ViewsContainer";
import {CssBaseline, ThemeProvider} from "@mui/material";
import useThemeEffect from "./hooks/useThemeEffect.ts";

function App() {
  const userState = useState(initialUserState);
  const theme = useThemeEffect();
  useEffect(() => {
    console.log("App - MOUNT", "xBeesAuthorized")
    return () => console.log("App - UNMOUNT", "xBeesAuthorized")
  }, []);
  console.log("App - RENDER", "xBeesAuthorized", theme, userState)
  return (
    <div className="container">
      <UserContext.Provider value={userState}>
        <IntegrationConnect />
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ViewsContainer />
        </ThemeProvider>
      </UserContext.Provider>
    </div>
  )
}

export default App
