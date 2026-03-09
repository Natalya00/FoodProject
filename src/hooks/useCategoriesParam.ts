import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useCategoriesParam = (): [number[], (value: number[]) => void] => {
  const [searchParams, setSearchParams] = useSearchParams();

  const categoriesParam = searchParams.get('categories');
  const categoryIds: number[] = categoriesParam
    ? categoriesParam.split(',').map(id => parseInt(id, 10)).filter(id => !isNaN(id))
    : [];

  const setCategoryIds = useCallback((value: number[]) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      if (value.length > 0) {
        newParams.set('categories', value.join(','));
      } else {
        newParams.delete('categories');
      }
      return newParams;
    });
  }, [setSearchParams]);

  return [categoryIds, setCategoryIds];
};
