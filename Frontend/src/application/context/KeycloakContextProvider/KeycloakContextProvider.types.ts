import Keycloak from "keycloak-js";

export interface KeycloakState {
  keycloak: Keycloak | null;
  authenticated: boolean;
}

export type KeycloakContextActions =
  | { type: "setKeycloakInstance"; payload: Keycloak }
  | { type: "setAuthenticated"; payload: boolean };

export interface KeycloakAPI {
  logout: () => void;
}
