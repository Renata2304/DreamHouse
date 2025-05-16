import { createContext, useContext, useEffect, useMemo, useReducer, PropsWithChildren } from "react";
import Keycloak, { KeycloakInstance } from "keycloak-js";
import { KeycloakAPI, KeycloakState } from "./KeycloakContextProvider.types";
import { keycloakContextReducer } from "./keycloak.reducer";

const KeycloakDataContext = createContext<KeycloakState>({} as KeycloakState);
const KeycloakAPIContext = createContext<KeycloakAPI>({} as KeycloakAPI);

export const KeycloakContextProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(keycloakContextReducer, {
    keycloak: null,
    authenticated: false,
  });

  useEffect(() => {
    const keycloak: KeycloakInstance = new (Keycloak as any)({
      url: "http://localhost:1100/",
      realm: "dreamhouse",
      clientId: "backend-rest-api",
    });

    keycloak.init({ onLoad: "login-required" }).then((authenticated) => {
      if (authenticated) {
        localStorage.setItem("token", keycloak.token ?? "");
        dispatch({ type: "setKeycloakInstance", payload: keycloak });
        dispatch({ type: "setAuthenticated", payload: true });
      } else {
        dispatch({ type: "setAuthenticated", payload: false });
      }
    });
  }, []);

  const api: KeycloakAPI = useMemo(() => {
    return {
      logout: () => {
        if (state.keycloak) {
          state.keycloak.logout({ redirectUri: window.location.origin });
        }
      },
    };
  }, [state.keycloak]);

  return (
    <KeycloakAPIContext.Provider value={api}>
      <KeycloakDataContext.Provider value={state}>
        {children}
      </KeycloakDataContext.Provider>
    </KeycloakAPIContext.Provider>
  );
};

// Custom hooks
export const useKeycloakState = () => useContext(KeycloakDataContext);
export const useKeycloakAPI = () => useContext(KeycloakAPIContext);
