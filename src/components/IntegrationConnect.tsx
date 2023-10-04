import {useAuthorizationEffect} from "../hooks/useAuthorizationEffect";
import {useViewPortEffect} from "../hooks/useViewPortEffect";
import {useReadyEffect} from "../hooks/useReadyEffect";
// import useThemeEffect from "../hooks/useThemeEffect.ts";
import {useEffect} from "react";

export function IntegrationConnect() {
  useEffect(() => {
    console.log("IntegrationConnect - MOUNT", "xBeesAuthorized")
    return () => console.log("IntegrationConnect - UNMOUNT", "xBeesAuthorized")
  }, []);

  useReadyEffect();

  useViewPortEffect();

  useAuthorizationEffect();

  return null;
}
