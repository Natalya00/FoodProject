import React, { useState } from 'react';
import { AuthContext, type AuthContextType } from './AuthContext';
import { logout as removeAuthToken, getToken, getUser } from '@/api/auth';
import { useLogin } from '@/hooks/useLogin';
import { useRegister } from '@/hooks/useRegister';

import type { AuthResponse, RegisterData, LoginData } from '@/api/auth';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUserState] = useState<AuthResponse['user'] | null>(() => {
    const token = getToken();
    const savedUser = getUser();
    return token && savedUser ? savedUser : null;
  });

  const loginMutation = useLogin();
  const registerMutation = useRegister();

  const handleLogin = async (data: LoginData) => {
    const response = await loginMutation.mutateAsync(data);
    setUserState(response.user);
    return response;
  };

  const handleRegister = async (data: RegisterData) => {
    const response = await registerMutation.mutateAsync(data);
    setUserState(response.user);
    return response;
  };

  const handleLogout = () => {
    removeAuthToken();
    setUserState(null);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading: loginMutation.isPending || registerMutation.isPending,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
