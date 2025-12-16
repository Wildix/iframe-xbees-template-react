import {Link as RouterLink, Navigate, Outlet} from 'react-router-dom';

import {Stack} from '@mui/material';
import Link from '@mui/material/Link';

import {Paths} from '../app/router/enums';
import {useUserContext} from '../contexts/UserContext';

const ProtectedRoute = () => {
  const [user] = useUserContext();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <Stack p={2} direction="column" spacing={0.5}>
      <Outlet />
      <Link variant="subtitle1" component={RouterLink} to={`/${Paths.TOASTS_VIEW}`}>
        Test Toasts
      </Link>
      <Link variant="subtitle1" component={RouterLink} to={`/${Paths.OPEN_POPUP_VIEW}`}>
        Test Popups
      </Link>
    </Stack>
  );
};

export default ProtectedRoute;
