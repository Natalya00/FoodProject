import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '@/hooks/useFavorites';
import { API_BASE_URL } from '@/api/recipes';
import Card from '@/components/Card';
import SaveButton from '@/components/SaveButton';
import Text from '@/components/Text';
import SkeletonCard from '@/components/SkeletonCard';
import styles from './FavoritesPage.module.scss';


const FavoritesPage: React.FC = () => {
  const navigate = useNavigate();
  const { favorites, isLoading, error } = useFavorites();

  if (isLoading) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <Text view="title" className={styles.title}>My Favorites</Text>
          <div className={styles.grid}>
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <Text view="p-20" color="accent">Error loading favorites</Text>
        </div>
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <Text view="title" className={styles.title}>My Favorites</Text>
          <Text view="p-20">You haven't saved any recipes yet.</Text>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Text view="title" className={styles.title}>My Favorites</Text>
        <div className={styles.grid}>
          {favorites.map((favorite) => {
            const recipe = favorite.recipe;
            const imageUrl = recipe?.images?.[0]?.url;
            const fullImageUrl = imageUrl 
              ? (imageUrl.startsWith('http') ? imageUrl : `${API_BASE_URL}${imageUrl}`) 
              : '/recipes.jpg';
            
            return (
              <Card
                key={favorite.id}
                image={fullImageUrl}
                captionSlot={
                  <span className={styles.time}>
                    <img src="/alarm.svg" alt="" className={styles.icon} />
                    <Text view="p-14" weight="medium" color="secondary">
                      {recipe?.cookTime || 0} minutes
                    </Text>
                  </span>
                }
                title={<Text view="p-20" weight="medium" color="primary" maxLines={1}>{recipe?.name}</Text>}
                subtitle={
                  <Text view="p-16" color="secondary" maxLines={2}>
                    {recipe?.description?.replace(/<[^>]*>/g, '').substring(0, 100) || ''}
                  </Text>
                }
                contentSlot={
                  <Text view="p-18" weight="bold" color="accent">
                    {Math.round(recipe?.calories || 0)} kcal
                  </Text>
                }
                actionSlot={<SaveButton recipeId={recipe?.documentId} />}
                onClick={() => navigate(`/recipe/${recipe?.documentId}`)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FavoritesPage;
