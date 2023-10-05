import {useEffect} from "react";
import {useUserContext} from "../contexts/UserContext";
import connectProvider from "../helpers/connectProvider";

export function useAuthorizationEffect() {
  const [user] = useUserContext();

  useEffect(() => {
    const connect = connectProvider();
    const isAuthorized = !!user;

    if (isAuthorized) {
      void connect?.isAuthorized?.();
    } else {
      void connect?.isNotAuthorized?.()
    }

    const listener = (event: any) => {
      if (!user && !event.errorMessage) {
        void connect?.isNotAuthorized?.();
      }
    };
    connect.onSearchContacts(listener);
    return () => connect.off(listener)
  }, [user]);

  return user
}
