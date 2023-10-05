import './App.css'
import {ViewsContainer} from "./components/ViewsContainer";
import {CssBaseline, ThemeProvider} from "@mui/material";
import useThemeEffect from "./hooks/useThemeEffect.ts";
import {useViewPortEffect} from "./hooks/useViewPortEffect.ts";

function AppUi() {
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
