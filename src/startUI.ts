import {createElement} from 'react';
import {createRoot} from 'react-dom/client';

import App from './app/App';

export function startUI() {
  const rootContainer = document.getElementById('root')!;
  const reactRoot = createRoot(rootContainer);
  reactRoot.render(createElement(App));
}
