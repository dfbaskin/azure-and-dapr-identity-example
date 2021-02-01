import { Machine, assign } from "xstate";

interface AuthStateSchema {
  states: {
    pending: {};
    authenticated: {};
    unauthenticated: {};
  };
}

interface AuthStateContext {
  isUserAuthenticated: boolean;
  userId?: string;
  userName?: string;
}

type AuthStateEvents =
  | {
      type: "SIGNIN";
    }
  | {
      type: "SIGNOUT";
    }
  | {
      type: "USER_AUTHENTICATED";
      userId: string;
      userName: string;
    }
  | {
      type: "USER_NOT_AUTHENTICATED";
    };

export const authStateMachine = Machine<
  AuthStateContext,
  AuthStateSchema,
  AuthStateEvents
>(
  {
    id: "authState",
    initial: "pending",
    context: {
      isUserAuthenticated: false,
    },
    states: {
      pending: {
        entry: ["getUser"],
        on: {
          USER_AUTHENTICATED: {
            target: "authenticated",
            actions: ["setAuthenticatedUser"],
          },
          USER_NOT_AUTHENTICATED: {
            target: "unauthenticated",
            actions: ["setUnauthenticatedUser"],
          },
        },
      },
      authenticated: {
        on: {
          SIGNOUT: {
            target: "unauthenticated",
            actions: ["signOut"],
          },
        },
      },
      unauthenticated: {
        on: {
          SIGNIN: {
            target: "pending",
            actions: ["signIn"],
          },
        },
      },
    },
  },
  {
    actions: {
      setAuthenticatedUser: assign((_, event) => {
        if (event.type === "USER_AUTHENTICATED") {
          const { userId, userName } = event;
          return {
            isUserAuthenticated: true,
            userId,
            userName,
          };
        }
        return {};
      }),
      setUnauthenticatedUser: assign((_, event) => {
        if (event.type === "USER_NOT_AUTHENTICATED") {
          return {
            isUserAuthenticated: false,
            userId: undefined,
            userName: undefined,
          };
        }
        return {};
      }),
    },
  }
);
