import React from 'react';
import { useFavorites } from '@/hooks/useFavorites';
import { useAuth } from '@/hooks/useAuth';
import Button from '@/components/Button';
import styles from './SaveButton.module.scss';

type SaveButtonProps = {
  recipeId: string;
};

const SaveButton: React.FC<SaveButtonProps> = ({ recipeId }) => {
  const { isAuthenticated } = useAuth();
  const { isFavorite, toggleFavorite, isPending } = useFavorites();

  const favorite = isFavorite(recipeId);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      alert('Please login to save recipes');
      return;
    }
    toggleFavorite(recipeId);
  };


  return (
    <Button
      onClick={handleClick}
      disabled={isPending}
      className={favorite ? styles.saved : ''}
    >
      {isPending ? 'Loading...' : (favorite ? 'Saved' : 'Save')}
    </Button>
  );

};

export default SaveButton;
