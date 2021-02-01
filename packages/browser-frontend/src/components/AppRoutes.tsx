import { App } from "./App";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { AppHeader } from "./AppHeader";
import { About } from "./About";
import { AuthCallback } from "./AuthCallback";

export function AppRoutes() {
  return (
    <Router>
      <AppHeader />
      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/auth-callback">
          <AuthCallback />
        </Route>
        <Route path="/logout">
          <Redirect to="/" />
        </Route>
        <Route path="/">
          <App />
        </Route>
      </Switch>
    </Router>
  );
}
