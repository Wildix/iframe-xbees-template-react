import {useAuthorizationEffect} from "../hooks/useAuthorizationEffect";
import {useReadyEffect} from "../hooks/useReadyEffect";
import useFetchContactsByQuery from "../hooks/useFetchContactsByQuery.ts";

// import useThemeEffect from "../hooks/useThemeEffect.ts";

export function IntegrationConnect() {
  useReadyEffect();

  useAuthorizationEffect();

  useFetchContactsByQuery();

  return null;
}
