import React from 'react';
import styles from './RecipeSummary.module.scss';

interface RecipeSummaryProps {
  description: string;
}

const RecipeSummary: React.FC<RecipeSummaryProps> = ({ description }) => {
  return (
    <section className={styles.section}>
      <div className={styles.content} dangerouslySetInnerHTML={{ __html: description }} />
    </section>
  );
};

export default RecipeSummary;
