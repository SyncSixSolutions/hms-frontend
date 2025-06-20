// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import api from './axiosInstance';

// Define input types
export interface SignInPayload {
  email: string;
  password: string;
}

export interface SignUpPayload {
   token: string;
    expires_in: number;
    refresh_expires_in: number;
    refresh_token: string;
    token_type: "Bearer";
    not_before_policy: number;
    session_state: string;
    scope: [string];
}

export interface AuthResponse {
    access_token: string;
    expires_in: number;
    refresh_expires_in: number;
    refresh_token: string;
    token_type: "Bearer";
    not_before_policy: number;
    session_state: string;
    scope: [string];
}

// Sign In
export const signin = (data: SignInPayload) => (
  console.log('Sign In Payload:', data),
  api.post<AuthResponse>('/users/customer/keycloak-login', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
)

// Sign Up
export const signup = (data: SignUpPayload) =>
  api.post<AuthResponse>('/auth/signup', data);