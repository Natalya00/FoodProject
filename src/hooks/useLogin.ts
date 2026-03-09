import { useMutation } from '@tanstack/react-query';
import { login, setToken, setUser } from '@/api/auth';

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      setToken(response.jwt);
      setUser(response.user);
    },
  });
};
