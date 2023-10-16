import {useEffect, useState} from "react";
import xBeesConnect from "../helpers/xBeesConnect";
import {deepmerge} from "@mui/utils";
import {createTheme, ThemeOptions} from "@mui/material";

type ChangeThemeParams = { mode: "light" | "dark", themeOptions?: Partial<ThemeOptions> };

const options = {
  palette: {
    background: {
      default: "transparent"
    }
  }
};

export default function useThemeEffect() {
  const [theme, setTheme] = useState(createTheme(options));
  useEffect(() => {
    const connect = xBeesConnect();
    const changeTheme: (payload: ChangeThemeParams) => void = ({themeOptions}) => {
      const newTheme = createTheme(deepmerge(themeOptions, options));
      setTheme(newTheme);
    };

    connect.getTheme().then((themeResponse: any) => changeTheme(themeResponse?.payload));

    connect.onThemeChange(changeTheme);

    return () => {
      connect.off(changeTheme);
    }
  }, []);

  return theme;
};
