import axios, {
  AxiosInstance,
  AxiosRequestHeaders,
  InternalAxiosRequestConfig,
} from 'axios';
import { jwtDecode } from 'jwt-decode';

declare module 'axios' {
  export interface InternalAxiosRequestConfig {
    skipAuth?: boolean;
  }
}

const isTokenExpired = (token: string): boolean => {
  try {
    const decoded: { exp: number } = jwtDecode(token);
    return Date.now() >= decoded.exp * 1000;
  } catch {
    return true;
  }
};

const refreshAccessToken = async (): Promise<string | null> => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) return null;

  try {
    const response = await axios.post('http://localhost:8178/api/auth/refresh-token', {
      refresh_token: refreshToken,
    });

    const { token, refresh_token: newRefreshToken } = response.data;
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', newRefreshToken);
    return token;
  } catch (error) {
    console.error('Token refresh failed:', error);
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    window.location.href = '/signin';
    return null;
  }
};

const instance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8178/api',
  timeout: 5000,
});
instance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    if (config.skipAuth === true) return config;

    const token = localStorage.getItem('token');
    //const publicEndpoints = ['/keycloak-login', '/register', '/refresh-token'];
    //const isPublic = publicEndpoints.some((endpoint) => config.url?.includes(endpoint));
    //if (isPublic) return config;

    if (token) {
      const expired = isTokenExpired(token);
      const validToken = expired ? await refreshAccessToken() : token;

      if (validToken) {
        if (!config.headers) config.headers = {} as AxiosRequestHeaders;
        config.headers['Authorization'] = `Bearer ${validToken}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;