import {
  LogLevel,
  Configuration,
  PublicClientApplication,
  AuthenticationResult,
  AccountInfo,
  InteractionRequiredAuthError,
} from "@azure/msal-browser";
import { AuthConfig, fetchAuthConfig, isProductionMode } from "./ConfigService";

interface ExpectedTokenClaims {
  name?: string; // User Name
  preferred_username?: string; // Email
}

let currentAccount: AccountInfo | null = null;

const authClientPromise = fetchAuthConfig()
  .then((config) => initializeAuthLibrary(config))
  .then((authClient) => {
    return authClient
      .handleRedirectPromise()
      .then((tokenResponse) => processToken(tokenResponse))
      .then(() => authClient);
  });

function initializeAuthLibrary({ clientId, authority }: AuthConfig) {
  const url = new URL(window.location.href);
  const redirectUri = `${url.protocol}//${url.hostname}:${url.port}/auth-callback`;
  const postLogoutRedirectUri = `${url.protocol}//${url.hostname}:${url.port}/logout`;
  const loggerCallback = (level: LogLevel, message: string) => {
    switch (level) {
      case LogLevel.Error:
        console.error(`[MSAL/${level}] ${message}`);
        break;
      case LogLevel.Warning:
        console.warn(`[MSAL/${level}] ${message}`);
        break;
      default:
        console.log(`[MSAL/${level}] ${message}`);
        break;
    }
  };
  const authConfig: Configuration = {
    auth: {
      clientId,
      authority,
      redirectUri,
      postLogoutRedirectUri,
      navigateToLoginRequestUrl: false,
    },
    cache: {
      cacheLocation: "sessionStorage",
      storeAuthStateInCookie: false,
    },
    system: {
      loggerOptions: {
        logLevel: isProductionMode() ? LogLevel.Error : LogLevel.Verbose,
        loggerCallback,
      },
    },
  };

  return new PublicClientApplication(authConfig);
}

function getCurrentToken(authClient: PublicClientApplication, login: boolean) {
  return Promise.resolve(null).then(() => {
    let account = currentAccount;
    if (!account) {
      const accountId = getLastCurrentAccountId();
      if (accountId) {
        account = authClient.getAccountByHomeId(accountId);
      }
    }
    if (account) {
      return authClient
        .acquireTokenSilent({
          account,
          scopes: ["user.read"],
        })
        .catch((err) => {
          if (err instanceof InteractionRequiredAuthError) {
            userSignin();
          }

          console.error("acquireTokenSilent error", err);
          return null;
        });
    } else if (login) {
      userSignin();
    }
    return null;
  });
}

type ProcessTokenReturnType =
  | {
      isAuthenticated: true;
      displayId: string;
      name: string;
      bearerToken: string;
    }
  | {
      isAuthenticated: false;
    };

function processToken(
  tokenResponse: AuthenticationResult | null
): Promise<ProcessTokenReturnType> {
  return Promise.resolve(tokenResponse).then((tokenResponse) => {
    if (tokenResponse !== null && tokenResponse.account !== null) {
      const { account, idToken } = tokenResponse;
      const claims = tokenResponse.idTokenClaims as ExpectedTokenClaims;
      currentAccount = account;
      saveCurrentAccountId(account.homeAccountId);
      return {
        isAuthenticated: true,
        displayId: claims.preferred_username || account.username || "n/a",
        name: claims.name || "n/a",
        bearerToken: idToken,
      };
    } else {
      return {
        isAuthenticated: false,
      };
    }
  });
}

const CurrentAccountIdKeyName = "currentAccountId";

function saveCurrentAccountId(accountId?: string) {
  if (typeof accountId === "string") {
    window.localStorage.setItem(CurrentAccountIdKeyName, accountId);
  } else {
    currentAccount = null;
    window.localStorage.removeItem(CurrentAccountIdKeyName);
  }
}

function getLastCurrentAccountId() {
  return window.localStorage.getItem(CurrentAccountIdKeyName);
}

export function userSignin() {
  authClientPromise.then((authClient) => {
    authClient.loginRedirect({
      scopes: ["user.read"],
    });
  });
}

export function userSignout() {
  authClientPromise.then((authClient) => {
    saveCurrentAccountId();
    authClient.logout();
  });
}

export function getUserDetails() {
  return authClientPromise
    .then((authClient) => getCurrentToken(authClient, false))
    .then((tokenResponse) => processToken(tokenResponse));
}
