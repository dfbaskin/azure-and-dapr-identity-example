import { useAuthMachine } from "./AuthContext";
import { Main } from "./Main";

import "./App.scss";

export function App() {
  const [
    {
      context: { isUserAuthenticated },
    },
  ] = useAuthMachine();

  return (
    <div className="app">
      <h1>Example</h1>
      {!isUserAuthenticated && <div>Please sign in.</div>}
      {isUserAuthenticated && <Main />}
    </div>
  );
}
