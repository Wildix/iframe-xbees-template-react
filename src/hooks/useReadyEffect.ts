import {useEffect} from "react";
import xBeesConnect from "../helpers/xBeesConnect";

export function useReadyEffect() {
  useEffect(() => {
    const connect = xBeesConnect();

    //notify x-bees iframe was initialized
    void connect.ready();
  }, []);
}
