import React from 'react';
import styles from './Banner.module.scss';

const Banner: React.FC = () => {
  return (
    <div className={styles.banner}>
      <img src="/recipes.jpg" alt="Recipes" />
      <img src="/banner_text.svg" alt="Recipes" className={styles.text} />
    </div>
  );
};

export default Banner;
