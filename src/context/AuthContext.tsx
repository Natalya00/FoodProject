import { createContext } from 'react';
import type { AuthResponse, RegisterData, LoginData } from '@/api/auth';

export type AuthContextType = {
  user: AuthResponse['user'] | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: LoginData) => Promise<AuthResponse>;
  register: (data: RegisterData) => Promise<AuthResponse>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
