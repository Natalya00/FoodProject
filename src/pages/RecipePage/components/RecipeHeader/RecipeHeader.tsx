import React from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowDownIcon from '@/components/icons/ArrowDownIcon';
import styles from './RecipeHeader.module.scss';

interface RecipeHeaderProps {
  title: string;
}

const RecipeHeader: React.FC<RecipeHeaderProps> = ({ title }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.header}>
      <button
        type="button"
        className={styles.backButton}
        onClick={() => navigate('/')}
        aria-label="Назад"
      >
        <ArrowDownIcon color="accent" width={32} height={32} className={styles.icon} style={{ transform: 'rotate(90deg)' }} />
      </button>
      <h1 className={styles.title}>{title}</h1>
    </div>
  );
};

export default RecipeHeader;
