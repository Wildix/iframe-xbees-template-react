import {useEffect, useState} from "react";
import connectProvider from "../helpers/connectProvider";
import {deepmerge} from "@mui/utils";
import {createTheme, ThemeOptions} from "@mui/material";

type ChangeThemeParams = { mode: "light" | "dark", themeOptions?: Partial<ThemeOptions> };
export default function useThemeEffect() {
  const [theme, setTheme] = useState(createTheme());
  useEffect(() => {
    const connect =  connectProvider();
    const changeTheme: (payload: ChangeThemeParams) => void = ({mode, themeOptions}) => {
      const newTheme = createTheme(deepmerge(themeOptions, {
        palette: {
          background: {
            default: "transparent"
          }
        }
      }));
      setTheme(newTheme);
      console.log({mode, themeOptions})
    };

    connect.getTheme().then((themeResponse: any) => changeTheme(themeResponse?.payload));

    connect.onThemeChange(changeTheme);

    return () => {
      connect.off(changeTheme);
    }
  }, []);

  return theme;
};
