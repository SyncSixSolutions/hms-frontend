import api from './axiosInstance';
import { getDecodedToken } from './jwtDecode';

export const refreshAccessToken = async (): Promise<string | null> => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) return null;

  try {
    const response = await api.post('/auth/refresh-token', {
      refresh_token: refreshToken,
    });

    const { token, refresh_token: newRefreshToken } = response.data;

    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', newRefreshToken);

    return token;
  } catch (error) {
    console.error("Refresh token failed:", error);
    return null;
  }
};

export function isTokenExpired(): boolean {
  const decoded = getDecodedToken();
  if (!decoded?.exp) return true;
  return Date.now() >= decoded.exp * 1000;
}