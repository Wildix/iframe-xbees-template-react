import {createContext, Dispatch, SetStateAction, useContext} from 'react';
import {User} from '../types';

const item = localStorage.getItem('user');
export const initialUserState = item && JSON.parse(item);

export type UserContextState = [User | null, Dispatch<SetStateAction<User | null>>];
export const UserContext = createContext<UserContextState>([initialUserState, () => {}]);
export const useUserContext = () => useContext(UserContext);
