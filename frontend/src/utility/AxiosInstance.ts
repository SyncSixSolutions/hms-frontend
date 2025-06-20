import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8178/api',
  timeout: 5000,
});


instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    // Skip adding token for login or public endpoints
    const isLogin = config.url?.includes('/keycloak-login');
    const isSignup = config.url?.includes('/signup');

    if (token && !isLogin && !isSignup) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;