import React from 'react';
import styles from './SkeletonRecipePage.module.scss';

const SkeletonRecipePage: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={`${styles.skeleton} ${styles.title}`} />
        <div className={styles.meta}>
          <div className={`${styles.skeleton} ${styles.metaItem}`} />
          <div className={`${styles.skeleton} ${styles.metaItem}`} />
          <div className={`${styles.skeleton} ${styles.metaItem}`} />
        </div>
      </div>
      
      <div className={`${styles.skeleton} ${styles.image}`} />
      
      <div className={styles.row}>
        <div className={styles.column}>
          <div className={styles.section}>
            <div className={`${styles.skeleton} ${styles.sectionTitle}`} />
            <div className={`${styles.skeleton} ${styles.sectionContent}`} />
          </div>
        </div>
        <div className={styles.column}>
          <div className={styles.section}>
            <div className={`${styles.skeleton} ${styles.sectionTitle}`} />
            <div className={`${styles.skeleton} ${styles.sectionContent}`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonRecipePage;
