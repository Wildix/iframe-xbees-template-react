import Client from '@wildix/xbees-connect';

export const onLogout = () => {
  Client.getInstance().deleteFromStorage('user');
  void Client.getInstance().isNotAuthorized();
};
