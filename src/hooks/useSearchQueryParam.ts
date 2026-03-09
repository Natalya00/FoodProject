import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useSearchQueryParam = (): [string, (value: string) => void] => {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get('search') ?? '';

  const setSearchQuery = useCallback((value: string) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      if (value.trim()) {
        newParams.set('search', value.trim());
      } else {
        newParams.delete('search');
      }
      return newParams;
    });
  }, [setSearchParams]);

  return [searchQuery, setSearchQuery];
};
