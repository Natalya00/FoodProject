import React, { useState, useCallback } from 'react';
import Banner from './components/Banner';
import SearchSection from './components/SearchSection';
import RecipesList from './components/RecipesList';
import Pagination from './components/Pagination';
import { useCategories } from '@/hooks/useCategories';
import { useRecipeFilters } from '@/hooks/useRecipeFilters';
import type { Option } from '@/components/MultiDropdown';
import styles from './RecipesPage.module.scss';

const LIMIT = 9;

const RecipesPage: React.FC = () => {
  const [filters, setFilters] = useRecipeFilters();
  const [total, setTotal] = useState(0);
  const { categories, isLoading: isLoadingCategories } = useCategories();

  const selectedCategories: Option[] = filters.categories
    .map((id) => {
      const found = categories.find((c) => c.id === id);
      return found ? { key: found.documentId || found.id.toString(), value: found.name } : null;
    })
    .filter((cat): cat is Option => cat !== null);

  const handleSearch = useCallback((query: string) => {
    setFilters({ search: query, page: 1 });
  }, [setFilters]);

  const handleCategoriesChange = useCallback((newCategories: Option[]) => {
    const newIds = newCategories
      .map((cat) => {
        const found = categories.find((c) => c.name === cat.value);
        return found?.id;
      })
      .filter((id): id is number => id !== undefined);
    
    setFilters({ categories: newIds, page: 1 });
  }, [categories, setFilters]);

  const handlePageChange = useCallback((newPage: number) => {
    setFilters({ page: newPage });
  }, [setFilters]);

  return (
    <div className={styles.page}>
      <Banner />
      <SearchSection 
        onSearch={handleSearch}
        searchQuery={filters.search}
        selectedCategories={selectedCategories}
        onCategoriesChange={handleCategoriesChange}
        categories={categories}
        isLoadingCategories={isLoadingCategories}
      />
      <RecipesList 
        searchQuery={filters.search} 
        categoryIds={filters.categories} 
        page={filters.page}
        limit={LIMIT}
        onTotalChange={setTotal}
      />
      <Pagination 
        currentPage={filters.page}
        onPageChange={handlePageChange}
        limit={LIMIT}
        total={total}
      />
    </div>
  );
};

export default RecipesPage;
