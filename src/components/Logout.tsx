import {useUserContext} from "../contexts/UserContext";

export function Logout() {
  const [user, setUser] = useUserContext();
  const onClick = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return <div>
    <h3>You've logged in as <i>{`${user.name} <${user.email}>`}</i>. Your X-Application integration is active</h3>
    <button onClick={onClick}>Log out</button>
  </div>;
}
