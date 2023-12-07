import {createContext, useContext} from 'react';

const item = localStorage.getItem('user');
export const initialUserState = item && JSON.parse(item);

export const UserContext = createContext([initialUserState, () => {}]);
export const useUserContext = () => useContext(UserContext);
