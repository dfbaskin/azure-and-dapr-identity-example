import { getUserDetails } from "./AuthService";

export function pingBackend() {
  return getUserDetails()
    .then((details) => {
      if (!details.isAuthenticated) {
        throw new Error("User is not signed in.");
      }
      const { bearerToken } = details;
      return fetch("/api/ping", {
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
