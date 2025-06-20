import { getDecodedToken } from './jwtDecode';
import { refreshKeycloakToken } from './RefreshToken';

export function getToken(): string | null {
  return localStorage.getItem("token");
}

export async function isAuthenticated(): Promise<boolean> {
  const token = getToken();
  if (!token) {
    redirectToSignin();
    return false;
  }

  const decoded = getDecodedToken();
  if (!decoded || !decoded.exp) {
    redirectToSignin();
    return false;
  }

  const isExpired = Date.now() >= decoded.exp * 1000;

  if (isExpired) {
    try {
      const newToken = await refreshKeycloakToken(); // This should return null if refresh failed
      if (!newToken) {
        redirectToSignin();
        return false;
      }
      return true;
    } catch {
      redirectToSignin();
      return false;
    }
  }

  return true;
}

export function getUserInfo(): { username: string; roles: string | string[] } | null {
  const decoded = getDecodedToken();
  if (!decoded) return null;

  const username =
    decoded.name || "User";

  const roles = decoded.role || "User";
  
  return {
    username,
    roles,
  };
}

export function logout(): void {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  window.location.href = "/"; 
}

export function getUserRole(): string  {
  const decoded = getDecodedToken();
  if (!decoded || !decoded.role) return "guest";


  return decoded.role;
}

function redirectToSignin() {
  window.location.href = "/signin";
}