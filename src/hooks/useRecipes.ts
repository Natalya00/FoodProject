import { useQuery } from '@tanstack/react-query';
import { searchRecipes, type Recipe } from '@/api/recipes';

export const useRecipes = (
  search: string = '', 
  categories: number[] = [],
  page: number = 1,
  limit: number = 9
): {
  recipes: Recipe[];
  total: number;
  isLoading: boolean;
  error: Error | null;
} => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['recipes', search, categories, page, limit],
    queryFn: () => searchRecipes(search, categories, page, limit),
    placeholderData: (previousData) => previousData,
  });

  return {
    recipes: data?.recipes ?? [],
    total: data?.total ?? 0,
    isLoading,
    error,
  };
};
