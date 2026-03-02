import React, { useState, useEffect } from 'react';
import Text from '@/components/Text';
import Input from '@/components/Input';
import MultiDropdown from '@/components/MultiDropdown';
import Loader from '@/components/Loader';
import type { Option } from '@/components/MultiDropdown';
import type { Category } from '@/api/recipes';
import styles from './SearchSection.module.scss';

type SearchSectionProps = {
  onSearch: (query: string) => void;
  searchQuery: string;
  selectedCategories: Option[];
  onCategoriesChange: (categories: Option[]) => void;
  categories: Category[];
  isLoadingCategories?: boolean;
};

const SearchSection: React.FC<SearchSectionProps> = ({
  onSearch,
  searchQuery,
  selectedCategories,
  onCategoriesChange,
  categories,
  isLoadingCategories = false,
}) => {
  const [inputValue, setInputValue] = useState(searchQuery);

  useEffect(() => {
    setInputValue(searchQuery);
  }, [searchQuery]);

  const defaultCategories: Option[] = [
    { key: 'breakfast', value: 'Breakfast' },
    { key: 'lunch', value: 'Lunch' },
    { key: 'dinner', value: 'Dinner' },
  ];

  const categoryOptions: Option[] = categories.length > 0 
    ? categories.map((cat) => ({
        key: cat.documentId || cat.id.toString(),
        value: cat.name,
      }))
    : defaultCategories;

  const handleSearchClick = () => {
    onSearch(inputValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

  return (
    <div className={styles.section}>
      <Text view="p-20" className={styles.description}>
        Find the perfect food and <span className={styles.underline}>drink ideas</span> for every occasion, from <span className={styles.underline}>weeknight dinners</span> to <span className={styles.underline}>holiday feasts</span>.
      </Text>
      
      <div className={styles.searchRow}>
        <Input
          value={inputValue}
          onChange={setInputValue}
          onKeyDown={handleKeyDown}
          placeholder="Enter dishes"
          className={styles.input}
        />
        <button className={styles.searchButton} onClick={handleSearchClick}>
          <img src="/search.svg" alt="Search" />
        </button>
      </div>

      {isLoadingCategories ? (
        <div className={styles.loaderContainer}>
          <Loader size="s" />
        </div>
      ) : (
        <MultiDropdown
          options={categoryOptions}
          value={selectedCategories}
          onChange={onCategoriesChange}
          getTitle={(value) => value.length === 0 ? 'Categories' : value.map(v => v.value).join(', ')}
          className={styles.dropdown}
        />
      )}
    </div>
  );
};

export default SearchSection;
