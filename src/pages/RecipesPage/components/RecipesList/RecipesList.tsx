import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecipes } from '@/hooks/useRecipes';
import { API_BASE_URL } from '@/api/recipes';
import Card from '@/components/Card';
import SaveButton from '@/components/SaveButton';
import TextComponent from '@/components/Text';
import SkeletonCard from '@/components/SkeletonCard';
import styles from './RecipesList.module.scss';

type RecipesListProps = {
  searchQuery: string;
  categoryIds: number[];
  page: number;
  limit?: number;
  onTotalChange?: (total: number) => void;
};

const RecipesList: React.FC<RecipesListProps> = ({ searchQuery, categoryIds, page, limit = 9, onTotalChange }) => {
  const navigate = useNavigate();
  const { recipes, total, isLoading, error } = useRecipes(searchQuery, categoryIds, page, limit);

  React.useEffect(() => {
    onTotalChange?.(total);
  }, [total, onTotalChange]);

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.grid}>
          {Array.from({ length: 9 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </div>
    );
  }
  
  if (error) {
    console.error('Error fetching recipes:', error);
  }

  if (recipes.length === 0) {
    return (
      <div className={styles.container}>
        <TextComponent view="p-20" weight="medium">
          {searchQuery ? `No recipes found for "${searchQuery}"` : 'No recipes available'}
        </TextComponent>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {recipes.map((recipe) => {
          const imageUrl = recipe.images?.[0]?.url;
          const fullImageUrl = imageUrl ? (imageUrl.startsWith('http') ? imageUrl : `${API_BASE_URL}${imageUrl}`) : '/recipes.jpg';
          
          return (
            <Card
              key={recipe.id}
              image={fullImageUrl}
              captionSlot={
                <span className={styles.time}>
                  <img src="/alarm.svg" alt="" className={styles.icon} />
                  <TextComponent view="p-14" weight="medium" color="secondary">
                    {recipe.cookTime} minutes
                  </TextComponent>
                </span>
              }
              title={<TextComponent view="p-20" weight="medium" color="primary" maxLines={1}>{recipe.name}</TextComponent>}
              subtitle={
                <TextComponent view="p-16" color="secondary" maxLines={2}>
                  {recipe.description?.replace(/<[^>]*>/g, '').substring(0, 100) || ''}
                </TextComponent>
              }
              contentSlot={
                <TextComponent view="p-18" weight="bold" color="accent">
                  {Math.round(recipe.calories || 0)} kcal
                </TextComponent>
              }
              actionSlot={<SaveButton recipeId={recipe.documentId} />}
              onClick={() => navigate(`/recipe/${recipe.documentId}`)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RecipesList;
