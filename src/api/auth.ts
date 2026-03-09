import axios from 'axios';
import { API_BASE_URL } from './recipes';

export type AuthResponse = {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
    documentId?: string;
  };
};

export type RegisterData = {
  username: string;
  email: string;
  password: string;
};

export type LoginData = {
  identifier: string;
  password: string;
};

export const register = async (data: RegisterData): Promise<AuthResponse> => {
  const response = await axios.post(`${API_BASE_URL}/api/auth/local/register`, data);
  return response.data;
};

export const login = async (data: LoginData): Promise<AuthResponse> => {
  const response = await axios.post(`${API_BASE_URL}/api/auth/local`, data);
  return response.data;
};

export const getToken = (): string | null => {
  return localStorage.getItem('authToken');
};

export const setToken = (token: string): void => {
  localStorage.setItem('authToken', token);
};

export const removeToken = (): void => {
  localStorage.removeItem('authToken');
};

export const getUser = () => {
  const userStr = localStorage.getItem('authUser');
  return userStr ? JSON.parse(userStr) : null;
};

export const setUser = (user: AuthResponse['user']): void => {
  localStorage.setItem('authUser', JSON.stringify(user));
};

export const removeUser = (): void => {
  localStorage.removeItem('authUser');
};

export const logout = (): void => {
  removeToken();
  removeUser();
};
