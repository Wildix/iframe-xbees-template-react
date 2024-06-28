import {handleSystemStart} from './handleSystemStart';

const searchParams = new URLSearchParams(window.location.search);

switch (true) {
  case searchParams.has('authorize'): {
    // do auth redirects
    break;
  }

  // add cases which not requires start of app
  default: {
    void handleSystemStart();
  }
}
