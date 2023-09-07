import {useLayoutEffect} from "react";
import setViewport from "../helpers/setViewport";

export function useViewPortEffect() {
  useLayoutEffect(() => {
    //notify x-bees with preferred viewport size
    void setViewport();
    const onResize = () => {
      setTimeout(setViewport, 100);
    }
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize)
  })
}
