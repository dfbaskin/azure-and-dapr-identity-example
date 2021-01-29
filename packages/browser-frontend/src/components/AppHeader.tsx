import { Link } from "react-router-dom";

import "./AppHeader.scss";

export function AppHeader() {
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
      </nav>
    </header>
  );
}
