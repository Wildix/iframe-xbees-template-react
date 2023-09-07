import './App.css'
import {initialUserState, UserContext} from "./contexts/UserContext";
import {useState} from "react";
import {IntegrationConnect} from "./components/IntegrationConnect";
import {ViewsContainer} from "./components/ViewsContainer";

function App() {
  const userState = useState(initialUserState);

  return (
    <div className="container">
      <UserContext.Provider value={userState}>
        <IntegrationConnect />
        <ViewsContainer />
      </UserContext.Provider>
    </div>
  )
}

export default App
