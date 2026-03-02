import { useSearchParams } from 'react-router-dom';
import { useCallback } from 'react';

export const usePageParam = (): [number, (page: number | ((prev: number) => number)) => void] => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = parseInt(searchParams.get('page') || '1', 10);
  const validPage = isNaN(page) || page < 1 ? 1 : page;

  const setPage = useCallback((newPage: number | ((prev: number) => number)) => {
    setSearchParams((prevParams) => {
      const currentPage = parseInt(prevParams.get('page') || '1', 10);
      const validCurrentPage = isNaN(currentPage) || currentPage < 1 ? 1 : currentPage;
      
      const nextPage = typeof newPage === 'function' 
        ? newPage(validCurrentPage) 
        : newPage;
      
      const params = new URLSearchParams(prevParams);
      if (nextPage > 1) {
        params.set('page', nextPage.toString());
      } else {
        params.delete('page');
      }
      return params;
    });
  }, [setSearchParams]);

  return [validPage, setPage];
};
