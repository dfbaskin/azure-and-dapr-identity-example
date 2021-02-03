import { getGraphBearerToken, getUserDetails } from "./AuthService";

export function fetchMeFromBrowser() {
  return getGraphBearerToken()
    .then((details) => {
      if (!details.isAuthenticated) {
        throw new Error("User is not signed in.");
      }
      const { bearerToken } = details;
      return fetch("https://graph.microsoft.com/v1.0/me", {
        method: "get",
        headers: new Headers({
          Authorization: `Bearer ${bearerToken}`,
        }),
      });
    })
    .then((rsp) => {
      if (!rsp.ok) {
        throw new Error(`Request was not successful (HTTP: ${rsp.status})`);
      }
      return rsp.json();
    });
}

export function fetchMeFromBackend() {
  return getUserDetails()
    .then((details) => {
      if (!details.isAuthenticated) {
        throw new Error("User is not signed in.");
      }
      const { bearerToken } = details;
      return fetch("/api/current-user/me", {
        method: "get",
        headers: new Headers({
          Authorization: `Bearer ${bearerToken}`,
        }),
      });
    })
    .then((rsp) => {
      if (!rsp.ok) {
        throw new Error(`Request was not successful (HTTP: ${rsp.status})`);
      }
      return rsp.json();
    });
}
