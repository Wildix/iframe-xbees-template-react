import {useLayoutEffect} from "react";
import setViewport from "../helpers/setViewport";

export function useViewPortEffect() {
  useLayoutEffect(() => {
    //notify x-bees with preferred viewport size
    void setViewport();

    let timeout: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(setViewport, 100);
    }
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize)
  })
}
