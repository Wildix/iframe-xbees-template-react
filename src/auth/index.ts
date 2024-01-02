import {User} from '../types';
import Client from '@wildix/xbees-connect';

function getUserFromLocalStorage() {
  const userFromLocalStorage: User | null = Client.getInstance().getFromStorage('user');

  const currentUserEmail = Client.getInstance().getUserEmail();

  return userFromLocalStorage?.email === currentUserEmail ? userFromLocalStorage : null;
}

export default class Auth {
    private static instance: unknown = null;

    static refreshFromStorage() {
      Auth.getInstance().user = getUserFromLocalStorage();
    }

    static getInstance(): Auth {
        if (!this.instance) {
            this.instance = new Auth(getUserFromLocalStorage());
        }

        return this.instance as Auth;
    }

    constructor(userData: User | null) {
        this._user = userData;
    }

    get user() {
        return this._user;
    }

    set user(value) {
        this._user = value;
    }

    private _user: User | null;

    public isAuthorized() {
        return !!this.user
    }
}
