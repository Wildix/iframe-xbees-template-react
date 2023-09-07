import {useAuthorizationEffect} from "../hooks/useAuthorizationEffect";
import {useViewPortEffect} from "../hooks/useViewPortEffect";
import {useReadyEffect} from "../hooks/useReadyEffect";

export function IntegrationConnect() {
  useReadyEffect();

  useViewPortEffect();

  useAuthorizationEffect();

  return null;
}
