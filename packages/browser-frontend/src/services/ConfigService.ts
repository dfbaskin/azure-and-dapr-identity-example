export function isProductionMode() {
  return process.env.NODE_ENV === "production";
}

export interface AuthConfig {
  clientId: string;
  authority: string;
}

export function fetchAuthConfig(): Promise<AuthConfig> {
  return Promise.resolve({
    clientId: "f7edc002-e261-42e5-9140-8dde2e83260c",
    authority:
      "https://login.microsoftonline.com/fa1ee923-839f-4da5-a453-6eefaf3c9699/",
  });
  // return fetch("/api/config/auth").then(response => {
  //   if (!response.ok) {
  //     throw new Error(
  //       `Client configuration returned HTTP status ${response.status}`
  //     );
  //   }
  //   return response.json();
  // });
}
