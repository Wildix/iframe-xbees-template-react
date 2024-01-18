import {Link as RouterLink, Navigate, Outlet} from 'react-router-dom';
import {useUserContext} from '../contexts/UserContext';
import Link from '@mui/material/Link';
import {Stack} from '@mui/material';
import {Paths} from '../roots';

const ProtectedRoute = () => {
  const [user] = useUserContext();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <Stack direction="column" spacing={0.5}>
      <Outlet />
      <Link variant="subtitle1" component={RouterLink} to={`/${Paths.TOASTS_VIEW}`}>Test Toasts</Link>
      <Link variant="subtitle1" component={RouterLink} to={`/${Paths.OPEN_POPUP_VIEW}`}>Test Popups</Link>
    </Stack>
);
};

export default ProtectedRoute;
