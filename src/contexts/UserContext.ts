import {createContext, Dispatch, SetStateAction, useContext} from 'react';

import Client from '@wildix/xbees-connect';

import {User} from './types';

export const initialUserState: User | null = Client.getInstance().getFromStorage('user');

export type UserContextState = [User | null, Dispatch<SetStateAction<User | null>>];
export const UserContext = createContext<UserContextState>([initialUserState, () => {}]);
export const useUserContext = () => useContext(UserContext);
