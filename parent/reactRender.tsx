import {createElement} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';

export function renderReact() {
  const rootContainer = document.getElementById('root')!;
  const reactRoot = createRoot(rootContainer);
  reactRoot.render(createElement(App))
}
