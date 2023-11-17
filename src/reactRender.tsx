import ReactLib from 'react';
import ReactDOM from 'react-dom/client';
import Root from './Root';

export default function renderReact() {
  const rootContainer = document.getElementById('root')!;
  const reactRoot = ReactDOM.createRoot(rootContainer);
  reactRoot.render(ReactLib.createElement(Root))
}
