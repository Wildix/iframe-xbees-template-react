import {MemoryRouter, Navigate, Route, Routes} from 'react-router-dom';

import {Paths, PublicPaths} from '../app/router/enums';
import {useAuthorizationEffect} from '../hooks/useAuthorizationEffect';
import {Logout} from '../modules/login/components/Logout';
import {InputsView} from '../modules/login/input/InputsView';
import {Login} from '../modules/login/views/Login';
import {LoginWaiting} from '../modules/login/views/LoginWaiting';
import {ContactInfo} from '../pages/ContactInfo';
import {PopupsView} from '../pages/PopupsView';
import {TabView} from '../pages/TabView';
import {ToastsView} from '../pages/ToastsView';
import {Welcome} from '../pages/Welcome';
import ProtectedRoute from './ProtectedRoute';

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
        <Route path={PublicPaths.LOGOUT} element={<Logout />} />
        <Route element={<ProtectedRoute />}>
          <Route path={Paths.OPEN_POPUP_VIEW} element={<PopupsView />} />
          <Route path={Paths.TOASTS_VIEW} element={<ToastsView />} />
          <Route path={Paths.INPUTS_VIEW} element={<InputsView />} />
          <Route path={Paths.TAB_VIEW} element={<TabView />} />
          <Route path={`${Paths.CONTACT_VIEW}/*`} element={<ContactInfo />} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
}
