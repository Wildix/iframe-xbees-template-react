import {useAuthorizationEffect} from "../hooks/useAuthorizationEffect";
import {useReadyEffect} from "../hooks/useReadyEffect";

// import useThemeEffect from "../hooks/useThemeEffect.ts";

export function IntegrationConnect() {
  useReadyEffect();

  useAuthorizationEffect();

  return null;
}
