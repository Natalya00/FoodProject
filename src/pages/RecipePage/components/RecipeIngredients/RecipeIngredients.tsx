import React from 'react';
import styles from './RecipeIngredients.module.scss';

interface RecipeIngredientsProps {
  ingredients: string[];
}

const RecipeIngredients: React.FC<RecipeIngredientsProps> = ({ ingredients }) => {
  const mid = Math.ceil(ingredients.length / 2);
  const col1 = ingredients.slice(0, mid);
  const col2 = ingredients.slice(mid);

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Ingredients</h2>
      <div className={styles.columns}>
        <ul className={styles.list}>
          {col1.map((item, i) => (
            <li key={i} className={styles.item}>
              <img src="/ingredients.svg" alt="" className={styles.icon} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <ul className={styles.list}>
          {col2.map((item, i) => (
            <li key={i} className={styles.item}>
              <img src="/ingredients.svg" alt="" className={styles.icon} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default RecipeIngredients;
