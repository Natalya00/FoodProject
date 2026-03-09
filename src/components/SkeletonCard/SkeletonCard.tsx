import React from 'react';
import styles from './SkeletonCard.module.scss';

const SkeletonCard: React.FC = () => {
  return (
    <div className={styles.card}>
      <div className={`${styles.skeleton} ${styles.image}`} />
      <div className={`${styles.skeleton} ${styles.caption}`} />
      <div className={`${styles.skeleton} ${styles.title}`} />
      <div className={`${styles.skeleton} ${styles.subtitle}`} />
      <div className={`${styles.skeleton} ${styles.content}`} />
      <div className={`${styles.skeleton} ${styles.button}`} />
    </div>
  );
};

export default SkeletonCard;
