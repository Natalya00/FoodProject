import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

export interface RecipeFilters {
  search: string;
  categories: number[];
  page: number;
}

export const useRecipeFilters = (): [
  RecipeFilters,
  (updates: Partial<RecipeFilters>) => void
] => {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('search') ?? '';
  
  const categoriesParam = searchParams.get('categories');
  const categories = categoriesParam
    ? categoriesParam.split(',').map(id => parseInt(id, 10)).filter(id => !isNaN(id))
    : [];
  
  const pageParam = searchParams.get('page');
  const page = pageParam ? Math.max(1, parseInt(pageParam, 10)) : 1;

  const setFilters = useCallback((updates: Partial<RecipeFilters>) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      
      if (updates.search !== undefined) {
        if (updates.search.trim()) {
          newParams.set('search', updates.search.trim());
        } else {
          newParams.delete('search');
        }
      }
      
      if (updates.categories !== undefined) {
        if (updates.categories.length > 0) {
          newParams.set('categories', updates.categories.join(','));
        } else {
          newParams.delete('categories');
        }
      }
      
      if (updates.page !== undefined) {
        if (updates.page > 1) {
          newParams.set('page', updates.page.toString());
        } else {
          newParams.delete('page');
        }
      }
      
      return newParams;
    });
  }, [setSearchParams]);

  return [{ search, categories, page }, setFilters];
};
