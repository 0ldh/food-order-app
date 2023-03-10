import React, { useContext } from 'react';

import styles from './Header.module.css';
import meals from '../../assets/meals.jpg';
import HeaderCartButton from './HeaderCartButton';
import CartContext, { Cart } from '../../context/CartContext';

interface HeaderCartProps {
  onShowCart: () => void;
}

function Header({ onShowCart }: HeaderCartProps) {
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
