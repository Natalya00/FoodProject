import React, { useState } from 'react';
import Text from '@/components/Text';
import Input from '@/components/Input';
import MultiDropdown from '@/components/MultiDropdown';
import type { Option } from '@/components/MultiDropdown';
import styles from './SearchSection.module.scss';

const SearchSection: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<Option[]>([]);

  const categories: Option[] = [
    { key: 'breakfast', value: 'Breakfast' },
    { key: 'lunch', value: 'Lunch' },
    { key: 'dinner', value: 'Dinner' },
  ];

  return (
    <div className={styles.section}>
      <Text view="p-20" className={styles.description}>
        Find the perfect food and <span className={styles.underline}>drink ideas</span> for every occasion, from <span className={styles.underline}>weeknight dinners</span> to <span className={styles.underline}>holiday feasts</span>.
      </Text>
      
      <div className={styles.searchRow}>
        <Input
          value={searchValue}
          onChange={setSearchValue}
          placeholder="Enter dishes"
          className={styles.input}
        />
        <button className={styles.searchButton}>
          <img src="/search.svg" alt="Search" />
        </button>
      </div>

      <MultiDropdown
        options={categories}
        value={selectedCategories}
        onChange={setSelectedCategories}
        getTitle={(value) => value.length === 0 ? 'Categories' : value.map(v => v.value).join(', ')}
        className={styles.dropdown}
      />
    </div>
  );
};

export default SearchSection;
