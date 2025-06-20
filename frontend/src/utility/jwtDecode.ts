// src/utils/tokenUtils.ts
import { jwtDecode } from 'jwt-decode';

export interface DecodedToken {
  sub: string;
  exp: number;
  iat: number;
  role: string ; 
  name: string;
}

export const getDecodedToken = (): DecodedToken | null => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const decoded: DecodedToken = jwtDecode(token);
    return decoded;
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
};