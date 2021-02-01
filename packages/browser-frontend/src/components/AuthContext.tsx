import { useMachine } from "@xstate/react";
import { createContext, ReactNode, useContext } from "react";
import { authStateMachine } from "../services/AuthStateMachine";
import {
  userSignin,
  userSignout,
  getUserDetails,
} from "../services/AuthService";

// --- Used for typing only (never instantiated).
class MachineContextTypeHelper {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  Return = useMachine(authStateMachine);
}
type MachineContextType = MachineContextTypeHelper["Return"];

const AuthContext = createContext<MachineContextType | undefined>(undefined);

interface ProviderProps {
  children: ReactNode;
}

export function AuthContextProvider({ children }: ProviderProps) {
  const machine = useMachine(authStateMachine, {
    actions: {
      getUser: () => {
        const [, send] = machine;
        getUserDetails()
          .then((result) => {
            if (result.isAuthenticated) {
              const { displayId, name } = result;
              send({
                type: "USER_AUTHENTICATED",
                userId: displayId,
                userName: name,
              });
            } else {
              send({
                type: "USER_NOT_AUTHENTICATED",
              });
            }
          })
          .catch((err) => {
            console.error(err);
            send({
              type: "USER_NOT_AUTHENTICATED",
            });
          });
      },
      signIn: () => {
        console.log({ signIn: true, state: machine[0].context });
        userSignin();
      },
      signOut: () => userSignout(),
    },
  });

  return (
    <AuthContext.Provider value={machine}>{children}</AuthContext.Provider>
  );
}

export function useAuthMachine() {
  const machine = useContext(AuthContext);
  if (machine === undefined) {
    throw new Error("Authentication state machine not in component hierarchy.");
  }
  return machine;
}
