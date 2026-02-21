import React from 'react';
import ArrowDownIcon from '@/components/icons/ArrowDownIcon';
import styles from './Pagination.module.scss';

const Pagination: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.pagination}>
        <div className={styles.arrow}>
          <ArrowDownIcon color="secondary" style={{ transform: 'rotate(90deg)' }} />
        </div>
        <div className={styles.pages}>
          <div className={`${styles.page} ${styles.active}`}>1</div>
          <div className={styles.page}>2</div>
          <div className={styles.page}>3</div>
          <div className={styles.dots}>...</div>
          <div className={styles.page}>9</div>
        </div>
        <div className={styles.arrow}>
          <ArrowDownIcon color="secondary" style={{ transform: 'rotate(-90deg)' }} />
        </div>
      </div>
    </div>
  );
};

export default Pagination;
