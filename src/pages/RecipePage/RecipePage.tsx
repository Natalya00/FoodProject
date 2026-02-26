import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRecipeById, type Recipe, API_BASE_URL } from '@/api/recipes';
import RecipeHeader from './components/RecipeHeader';
import RecipeSummary from './components/RecipeSummary';
import RecipeIngredients from './components/RecipeIngredients';
import RecipeEquipment from './components/RecipeEquipment';
import RecipeDirections from './components/RecipeDirections';
import styles from './RecipePage.module.scss';

const RecipePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getRecipeById(id)
        .then((data) => {
          setRecipe(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching recipe:', error);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!recipe) return <div>Recipe not found</div>;

  const imageUrl = recipe.images?.[0]?.url;
  const fullImageUrl = imageUrl ? (imageUrl.startsWith('http') ? imageUrl : `${API_BASE_URL}${imageUrl}`) : '/recipes.jpg';

  const prepTime = recipe.prepTime ?? 5;
  const cookTime = recipe.cookTime ?? 555;
  const totalTime = prepTime + cookTime;
  const likes = recipe.reviewCount ?? 0;
  const equipment = recipe.equipment?.length ? recipe.equipment : [];

  return (
    <div className={styles.page}>
      <RecipeHeader title={recipe.name} />
      <div className={styles.content}>
        <div className={styles.topSection}>
          <img src={fullImageUrl} alt={recipe.name} className={styles.image} />
          <div className={styles.metricsBlock}>
            <div className={styles.metric}>
              <div className={styles.metricLabel}>Preparation</div>
              <div className={styles.metricValue}>{prepTime} minutes</div>
            </div>
            <div className={styles.metric}>
              <div className={styles.metricLabel}>Cooking</div>
              <div className={styles.metricValue}>{cookTime} minutes</div>
            </div>
            <div className={styles.metric}>
              <div className={styles.metricLabel}>Total</div>
              <div className={styles.metricValue}>{totalTime} minutes</div>
            </div>
            <div className={styles.metric}>
              <div className={styles.metricLabel}>Likes</div>
              <div className={styles.metricValue}>{likes}</div>
            </div>
            <div className={styles.metric}>
              <div className={styles.metricLabel}>Servings</div>
              <div className={styles.metricValue}>{recipe.servings || 4} servings</div>
            </div>
            <div className={styles.metric}>
              <div className={styles.metricLabel}>Ratings</div>
              <div className={styles.metricValue}>{recipe.rating ?? 2} / 5</div>
            </div>
          </div>
        </div>

        {recipe.description && (
          <RecipeSummary description={recipe.description} />
        )}

        <div className={styles.ingredientsEquipmentRow}>
          <RecipeIngredients ingredients={recipe.ingredients ?? []} />
          <div className={styles.ingredientsEquipmentDivider} aria-hidden />
          <RecipeEquipment equipment={equipment} />
        </div>

        {(recipe.instructions?.length ?? 0) > 0 && (
          <RecipeDirections instructions={recipe.instructions ?? []} />
        )}
      </div>
    </div>
  );
};

export default RecipePage;
