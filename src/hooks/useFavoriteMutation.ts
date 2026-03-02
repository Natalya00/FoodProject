import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addFavorite, removeFavorite } from '@/api/favorites';

export const useFavoriteMutation = () => {
  const queryClient = useQueryClient();

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

  const toggleFavorite = async (recipeId: string, isFavorite: boolean) => {
    if (isFavorite) {
      await removeMutation.mutateAsync(recipeId);
    } else {
      await addMutation.mutateAsync(recipeId);
    }
  };

  return {
    toggleFavorite,
    isPending: addMutation.isPending || removeMutation.isPending,
    isAdding: addMutation.isPending,
    isRemoving: removeMutation.isPending,
  };
};
