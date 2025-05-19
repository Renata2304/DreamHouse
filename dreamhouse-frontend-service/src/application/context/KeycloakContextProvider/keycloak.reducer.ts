import { KeycloakContextActions, KeycloakState } from "./KeycloakContextProvider.types";

export const keycloakContextReducer = (
  state: KeycloakState,
  action: KeycloakContextActions
): KeycloakState => {
  switch (action.type) {
    case "setKeycloakInstance":
      return {
        ...state,
        keycloak: action.payload,
      };
    case "setAuthenticated":
      return {
        ...state,
        authenticated: action.payload,
      };
    default:
      return state;
  }
};
