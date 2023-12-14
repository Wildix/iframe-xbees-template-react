import {useUserContext} from '../contexts/UserContext';
import {Welcome} from './Welcome';
import {ContextInfoView} from './ContextInfoView';
import {useAuthorizationEffect} from '../hooks/useAuthorizationEffect';
import {Typography} from '@mui/material';

export function ViewsContainer() {
  const [user] = useUserContext();
  useAuthorizationEffect();

  if (!user) {
    return <Welcome />
  } else {
    return (
      <>
        <br />
        <Typography variant="subtitle1">welcome</Typography>
        <Typography variant="body2">{`${user.name} (${user.email})`}</Typography>
        <ContextInfoView />
      </>
    )
  }
}
