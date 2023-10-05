import {useEffect} from "react";
import connectProvider from "../helpers/connectProvider";

export function useReadyEffect() {
  useEffect(() => {
    const connect = connectProvider();

    //notify x-bees iframe was initialized
    void connect.ready();
  }, []);
}
