import {createContext, Dispatch, SetStateAction, useContext} from 'react';
import {User} from '../types';
import Client from '@wildix/xbees-connect';

export const initialUserState: User | null = Client.getInstance().getFromStorage('user');

export type UserContextState = [User | null, Dispatch<SetStateAction<User | null>>];
export const UserContext = createContext<UserContextState>([initialUserState, () => {}]);
export const useUserContext = () => useContext(UserContext);
