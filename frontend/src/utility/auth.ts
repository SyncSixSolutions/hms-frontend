import { getDecodedToken } from './jwtDecode';

export function getToken(): string | null {
  return localStorage.getItem("token");
}

export function isAuthenticated(): boolean {
  const decoded = getDecodedToken();
  if (!decoded || !decoded.exp) return false;

  return Date.now() < decoded.exp * 1000;
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