import React from 'react';
import Banner from './components/Banner';
import SearchSection from './components/SearchSection';
import RecipesList from './components/RecipesList';
import Pagination from './components/Pagination';
import styles from './RecipesPage.module.scss';

const RecipesPage: React.FC = () => {
  return (
    <div className={styles.page}>
      <Banner />
      <SearchSection />
      <RecipesList />
      <Pagination />
    </div>
  );
};

export default RecipesPage;
