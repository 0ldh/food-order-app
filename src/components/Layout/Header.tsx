import React from 'react';

import styles from './Header.module.css';
import meals from '../../assets/meals.jpg';
import HeaderCartButton from './HeaderCartButton';

interface HeaderProps {
  onShowCart: () => void;
}

function Header({ onShowCart }: HeaderProps) {
  return (
    <>
      <header className={styles.header}>
        <h1>MACdonald</h1>
        <HeaderCartButton onShowCart={onShowCart} />
      </header>
      <div className={styles['main-image']}>
        <img src={meals} alt="food" />
      </div>
    </>
  );
}

export default Header;
