// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import api from './axiosInstance';
import type { InternalAxiosRequestConfig } from 'axios'

// Define input types
export interface SignInPayload {
  email: string;
  password: string;
}

export interface SignUpPayload {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  passwordHash: string;
  confirmPassword: string;
  phoneNumber?: string; // Optional field
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

export interface RegisterResponse {
    message: string;
}

// Sign In
export const signin = (data: SignInPayload) => (
  //console.log('Sign In Payload:', data),
  api.post<AuthResponse>('/users/customer/keycloak-login', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
)

// Sign Up
export const signup = (data: SignUpPayload) =>
  api.post<RegisterResponse>('/users/customer/register', data, {
    skipAuth: true,
    headers: {
      'Content-Type': 'application/json',
    },
  } as InternalAxiosRequestConfig);