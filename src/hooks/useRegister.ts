import { useMutation } from '@tanstack/react-query';
import { register, setToken, setUser } from '@/api/auth';
import type { RegisterData } from '@/api/auth';

export const useRegister = () => {
  return useMutation({
    mutationFn: async (data: RegisterData) => {
      const response = await register(data);
      setToken(response.jwt);
      setUser(response.user);
      return response;
    },
  });
};
