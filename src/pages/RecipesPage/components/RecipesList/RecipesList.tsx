import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRecipes, type Recipe, API_BASE_URL } from '@/api/recipes';
import Card from '@/components/Card';
import Button from '@/components/Button';
import TextComponent from '@/components/Text';
import styles from './RecipesList.module.scss';

const RecipesList: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getRecipes()
      .then((data) => {
        setRecipes(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching recipes:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

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
              actionSlot={<Button>Save</Button>}
              onClick={() => navigate(`/recipe/${recipe.documentId}`)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RecipesList;
