import React from "react";
import ReactDOM from "react-dom";
import { AppRoutes } from "./components/AppRoutes";

import "./index.scss";

ReactDOM.render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>,
  document.getElementById("root")
);
