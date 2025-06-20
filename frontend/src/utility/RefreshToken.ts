import axios from 'axios';

const KEYCLOAK_URL = 'http://localhost:8080/auth/realms/spring-boot-microservices-realm/protocol/openid-connect/token';
const CLIENT_ID = 'spring-cloud-client'; 

// Call this function to refresh token
export const refreshKeycloakToken = async (): Promise<string | null> => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) return null;

  try {
    const params = new URLSearchParams();
    params.append('client_id', CLIENT_ID);
    params.append('grant_type', 'refresh_token');
    params.append('refresh_token', refreshToken);

    const response = await axios.post(KEYCLOAK_URL, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const {
      access_token,
      refresh_token: newRefreshToken,
    } = response.data;

    // Update localStorage
    localStorage.setItem('token', access_token);
    localStorage.setItem('refreshToken', newRefreshToken);

    return access_token;
  } catch (error) {
    console.error('Keycloak token refresh failed:', error);
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    window.location.href = '/signin';
    return null;
  }
};