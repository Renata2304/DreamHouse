import type { KeycloakInstance } from "keycloak-js";

export interface KeycloakState {
  keycloak: KeycloakInstance | null;
  authenticated: boolean;
}

export type KeycloakContextActions =
  | { type: "setKeycloakInstance"; payload: KeycloakInstance }
  | { type: "setAuthenticated"; payload: boolean };

export interface KeycloakAPI {
  logout: () => void;
}
