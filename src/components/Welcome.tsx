import xBeesLogo from '/logo.png'
import {Login} from "./Login";

export function Welcome() {
    return <>
        <div>
            <a href="https://github.com/wildix/" target="_blank">
                <img src={xBeesLogo} className="logo" alt="x-bees logo" />
            </a>
        </div>
        <Login />
        <p className="read-the-docs">
            Click on the X-Bees logo to learn more
        </p>
    </>;
}
