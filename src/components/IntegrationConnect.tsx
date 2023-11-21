import {useAuthorizationEffect} from '../hooks/useAuthorizationEffect';
import useFetchContactsByQuery from '../hooks/useFetchContactsByQuery';
import {useReadyEffect} from '@wildix/xbees-connect-react';

export function IntegrationConnect() {
  useReadyEffect();

  useAuthorizationEffect();

  useFetchContactsByQuery();

  return null;
}
