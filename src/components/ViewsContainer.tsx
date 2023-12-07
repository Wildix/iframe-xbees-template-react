import {useUserContext} from '../contexts/UserContext';
import {Welcome} from './Welcome';
import {ContextInfoView} from './ContextInfoView';
import {useAuthorizationEffect} from '../hooks/useAuthorizationEffect';

export function ViewsContainer() {
  const [user] = useUserContext();
  useAuthorizationEffect();

  if (!user) {
    return <Welcome />
  } else {
    return <ContextInfoView />
  }
}
