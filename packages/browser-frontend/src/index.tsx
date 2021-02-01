import React from "react";
import ReactDOM from "react-dom";
import { AppRoutes } from "./components/AppRoutes";
import { AuthContextProvider } from "./components/AuthContext";

import "./index.scss";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <AppRoutes />
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
