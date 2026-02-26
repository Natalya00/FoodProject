import React from 'react';
import styles from './RecipeDirections.module.scss';

interface RecipeDirectionsProps {
  instructions: string[];
}

const RecipeDirections: React.FC<RecipeDirectionsProps> = ({ instructions }) => {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Directions</h2>
      <ol className={styles.list}>
        {instructions.map((step, i) => (
          <li key={i} className={styles.step}>
            <span className={styles.stepLabel}>Step {i + 1}</span>
            <span className={styles.stepText}>{step}</span>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default RecipeDirections;
