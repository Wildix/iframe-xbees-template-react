import {useUserContext} from "../contexts/UserContext";

type CredentialResponse = {
    email: string;
}

type User = {
    name: string,
    email: string,
}

const credentialsMock: CredentialResponse = {
    email: "john.doe@test.cc"
}

const userMock: User = {
    name: "John Doe",
    email: "john.doe@test.cc"
}

function getUserFromCredentials(credentialResponse: CredentialResponse) {
    return credentialResponse ? userMock : null;
}

export function Login() {
    const [, setUser] = useUserContext();
    const onSuccess = (credentialResponse: CredentialResponse) => {
        const user = getUserFromCredentials(credentialResponse)
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user))
    };

    return <>
        <h3>Want to connect with your X-Application? Please Sign in</h3>
        <div className="card">
            <button onClick={() => onSuccess(credentialsMock)}>
                Login
            </button>
            <p>
                Edit <code>src/components/Login.tsx</code> and save to test
            </p>
        </div>
    </>;
}
