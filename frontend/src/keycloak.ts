// src/keycloak.ts
import Keycloak from 'keycloak-js';

const KEYCLOAK_INSTANCE_KEY = '__keycloak_instance__';

// Extend globalThis safely
declare global {
  interface Window {
    [KEYCLOAK_INSTANCE_KEY]?: Keycloak;
  }
}

const getKeycloak = (): Keycloak => {
  if (!window[KEYCLOAK_INSTANCE_KEY]) {
    window[KEYCLOAK_INSTANCE_KEY] = new Keycloak({
      url: 'http://localhost:8080/auth',
      realm: 'spring-boot-microservices-realm',
      clientId: 'spring-cloud-client',
    });
  }

  return window[KEYCLOAK_INSTANCE_KEY]!;
};

const keycloak = getKeycloak();
export default keycloak;