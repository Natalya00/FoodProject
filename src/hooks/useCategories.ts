import { useQuery } from '@tanstack/react-query';
import { getCategories, type Category } from '@/api/recipes';

export const useCategories = (): {
  categories: Category[];
  isLoading: boolean;
  error: Error | null;
} => {
  const { data = [], isLoading, error } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const result = await getCategories();
      return result;
    },

  });

  return {
    categories: data,
    isLoading,
    error,
  };
};
