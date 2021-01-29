import { App } from "./App";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AppHeader } from "./AppHeader";
import { About } from "./About";

export function AppRoutes() {
  return (
    <Router>
      <AppHeader />
      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/">
          <App />
        </Route>
      </Switch>
    </Router>
  );
}
