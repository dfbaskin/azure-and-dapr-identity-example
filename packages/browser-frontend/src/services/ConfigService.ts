export function isProductionMode() {
  return process.env.NODE_ENV === "production";
}

export interface AuthConfig {
  clientId: string;
  authority: string;
  apiScope: string;
}

export function fetchAuthConfig(): Promise<AuthConfig> {
  return fetch("/v1.0/invoke/users-api/method/api/config/auth").then(
    (response) => {
      if (!response.ok) {
        throw new Error(
          `Client configuration returned HTTP status ${response.status}`
        );
      }
      return response.json();
    }
  );
}
