import React from 'react';
import Text from '@/components/Text';
import styles from './Header.module.scss';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src="/logo.svg" alt="Logo" />
      </div>
      <Text view="p-20" weight="bold" color="primary">Food Client</Text>
      <nav className={styles.nav}>
        <Text view="p-16" color="accent">Recipes</Text>
        <Text view="p-16" color="primary">Meals Categories</Text>
        <Text view="p-16" color="primary">Products</Text>
        <Text view="p-16" color="primary">Menu Items</Text>
        <Text view="p-16" color="primary">Meal Planning</Text>
      </nav>
      <div className={styles.icons}>
        <img src="/logo_heart.svg" alt="Favorites" width={17} height={17} />
        <img src="/logo_user.svg" alt="User" width={24} height={24} />
      </div>
    </header>
  );
};

export default Header;
