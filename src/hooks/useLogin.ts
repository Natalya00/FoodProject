import { useMutation } from '@tanstack/react-query';
import { login, setToken, setUser } from '@/api/auth';
import type { LoginData } from '@/api/auth';

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data: LoginData) => {
      const response = await login(data);
      setToken(response.jwt);
      setUser(response.user);
      return response;
    },
  });
};
