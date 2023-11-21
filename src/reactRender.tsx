import {createElement} from 'react';
import {createRoot} from 'react-dom/client';
import Root from './Root';

export function renderReact() {
  const rootContainer = document.getElementById('root')!;
  const reactRoot = createRoot(rootContainer);
  reactRoot.render(createElement(Root))
}
