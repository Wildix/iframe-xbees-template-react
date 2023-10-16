import {useEffect} from "react";
import {useUserContext} from "../contexts/UserContext";
import xBeesConnect from "../helpers/xBeesConnect";

export function useAuthorizationEffect() {
  const [user, setUser] = useUserContext();

  useEffect(() => {
    const listener = () => {
      const item = localStorage.getItem("user");
      const itemState = item && JSON.parse(item);
      setUser(itemState);
    };
    addEventListener("storage", listener);
    return () => removeEventListener("storage", listener);
  }, [setUser]);

  useEffect(() => {
    const connect = xBeesConnect();
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
    connect.addEventListener("xBeesGetContactsAutoSuggest", listener);

    return () => connect.off(listener)
  }, [user]);
}
