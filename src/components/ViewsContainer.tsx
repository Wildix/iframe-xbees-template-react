import {useUserContext} from "../contexts/UserContext";
import {Welcome} from "./Welcome";
import {ContextInfoView} from "./ContextInfoView";
import {Logout} from "./Logout";
import {useSearchParams} from "../hooks/useSearchParams";

export function ViewsContainer() {
  const [user] = useUserContext();

  const searchParams = useSearchParams();

  switch (true) {
    case !user: {
      return <Welcome />
    }
    case searchParams.has('authorize'): {
      return <Logout />
    }
    default:
      return <ContextInfoView />
  }
}
