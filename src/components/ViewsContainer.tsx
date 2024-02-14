import {Welcome} from './Welcome';
import {ContextInfoView} from './ContextInfoView';
import {useAuthorizationEffect} from '../hooks/useAuthorizationEffect';
import {MemoryRouter, Navigate, Route, Routes} from 'react-router-dom';
import {Login} from './Login';
import {LoginWaiting} from './LoginWaiting';
import ProtectedRoute from './ProtectedRoute';
import {Logout} from './Logout';
import {ToastsView} from './ToastsView';
import {PopupsView} from './PopupsView';
import {Paths, PublicPaths} from '../roots';
import {InputsView} from './InputsView';

export function ViewsContainer() {
  useAuthorizationEffect();

  return (
    <MemoryRouter>
      <Routes>
        <Route path={PublicPaths.ROOT} element={<Welcome />}>
          <Route index element={<Navigate to={PublicPaths.AUTHORIZE} replace />} />
          <Route path={PublicPaths.AUTHORIZE} element={<Login />} />
          <Route path={PublicPaths.SIGN_IN_AWAITING} element={<LoginWaiting />} />
        </Route>
        <Route
          path={PublicPaths.LOGOUT}
          element={<Logout />}
        />
        <Route element={<ProtectedRoute />}>
          <Route path={Paths.OPEN_POPUP_VIEW} element={<PopupsView />} />
          <Route path={Paths.TOASTS_VIEW} element={<ToastsView />} />
          <Route path={Paths.INPUTS_VIEW} element={<InputsView />} />
          <Route path={`${Paths.CONTACT_VIEW}/*`} element={<ContextInfoView />} />
        </Route>
      </Routes>
    </MemoryRouter>
  )
}
