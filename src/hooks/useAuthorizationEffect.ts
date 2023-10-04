import {useEffect} from "react";
import {useUserContext} from "../contexts/UserContext";
import connectProvider from "../helpers/connectProvider";

export function useAuthorizationEffect() {
  const [user] = useUserContext();

  useEffect(() => {
    const connect = connectProvider();
    const isAuthorized = !!user;
    console.log("xBeesAuthorized", {isAuthorized, user})
    if (isAuthorized) {
      void connect?.isAuthorized?.();
    } else {
      void connect?.isNotAuthorized?.()
    }

    const listener = () => {
      if (!user) {
        void connect?.isNotAuthorized?.();
      }
    };
    window.addEventListener('message', listener);
    return () => window.removeEventListener('message', listener)
  }, [user]);

  return user
}
