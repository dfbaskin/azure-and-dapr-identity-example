import { Link } from "react-router-dom";
import { useAuthMachine } from "./AuthContext";

import "./AppHeader.scss";

export function AppHeader() {
  const [
    {
      context: { isUserAuthenticated, userId, userName },
    },
    send,
  ] = useAuthMachine();

  const onSignIn = () => {
    send({
      type: "SIGNIN",
    });
  };

  const onSignOut = () => {
    send({
      type: "SIGNOUT",
    });
  };

  return (
    <header className="app-header">
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
        <ul>
          {!isUserAuthenticated && (
            <button type="button" onClick={onSignIn}>
              Sign In
            </button>
          )}
          {isUserAuthenticated && (
            <>
              <span className="user" title={userId}>
                {userName}
              </span>
              <button type="button" onClick={onSignOut}>
                Sign Out
              </button>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
