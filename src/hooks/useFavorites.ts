import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getFavorites, addFavorite, removeFavorite } from '@/api/favorites';

export const useFavorites = () => {
  const queryClient = useQueryClient();

  const { data: favorites = [], isLoading, error } = useQuery({
    queryKey: ['favorites'],
    queryFn: getFavorites,
    retry: false,
  });

  const addMutation = useMutation({
    mutationFn: addFavorite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    },
  });

  const removeMutation = useMutation({
    mutationFn: removeFavorite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    },
  });

  const isFavorite = (recipeId: string) => {
    const result = favorites.some((fav) => fav.recipe?.documentId === recipeId);
    return result;
  };

  const toggleFavorite = async (recipeId: string) => {
    if (isFavorite(recipeId)) {
      await removeMutation.mutateAsync(recipeId);
    } else {
      await addMutation.mutateAsync(recipeId);
    }
  };

  return {
    favorites,
    isLoading,
    error,
    isFavorite,
    toggleFavorite,
    isPending: addMutation.isPending || removeMutation.isPending,
  };
};
