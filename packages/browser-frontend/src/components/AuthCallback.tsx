import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getUserDetails } from "../services/AuthService";

export function AuthCallback() {
  const history = useHistory();
  useEffect(() => {
    getUserDetails().then(() => {
      history.replace("/");
    });
  }, [history]);
  return null;
}
