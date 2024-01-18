import {Navigate, Outlet} from 'react-router-dom';
import {useUserContext} from '../contexts/UserContext';

const ProtectedRoute = () => {
  const [user] = useUserContext();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
