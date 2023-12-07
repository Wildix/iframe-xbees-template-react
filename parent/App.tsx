import {StrictMode} from 'react';

export default function App() {
    return  (
      <StrictMode>
        <iframe id="integration-iframe" src="./index.html" title="Main App" width="600" height="400" />
      </StrictMode>
    )
}
