import {useUserContext} from '../contexts/UserContext';
import {Welcome} from './Welcome';
import {ContextInfoView} from './ContextInfoView';
import {useAuthorizationEffect} from '../hooks/useAuthorizationEffect';
import Env from '../Env';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import {Login} from './Login';
import {LoginWaiting} from './LoginWaiting';
import ProtectedRoute from './ProtectedRoute';
import {Logout} from './Logout';
import {ToastsView} from './ToastsView';

function getBasename() {
  return Env.isDev() ? '/' : '/template-react/index.html';
}

export enum PublicPaths {
  root = '/',
  authorize = '/authorize',
  logout = '/logout',
  signInAwaiting = '/sign-in-awaiting',
}

export enum Paths {
  contact_view = 'contact-view',
  create_contact = 'create-contact',
  no_matches_view = 'no-matches-view',
  toasts_view = 'toasts-view'
}

export function ViewsContainer() {
  useAuthorizationEffect();

  return (
    <BrowserRouter basename={getBasename()}>
      <Routes>
        <Route path={PublicPaths.root} element={<Welcome />}>
          <Route index element={<Navigate to={PublicPaths.authorize} replace />} />
          <Route path={PublicPaths.authorize} element={<Login />} />
          <Route path={PublicPaths.signInAwaiting} element={<LoginWaiting />} />
        </Route>
        <Route
          path={PublicPaths.logout}
          element={<Logout />}
        />
        <Route element={<ProtectedRoute />}>
          <Route path={Paths.toasts_view} element={<ToastsView />} />
          <Route path={`${Paths.contact_view}/*`} element={<ContextInfoView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
