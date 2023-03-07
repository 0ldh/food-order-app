import React from 'react';

import style from './Header.module.css';
import meals from '../../assets/meals.jpg';
import HeaderCartButton from './HeaderCartButton';

interface HeaderCartProps {
  onShowCart: () => void;
}

function Header({ onShowCart }: HeaderCartProps) {
  return (
    <>
      <header className={style.header}>
        <h1>MACdonald</h1>
        <HeaderCartButton onShowCart={onShowCart} />
      </header>
      <div className={style['main-image']}>
        <img src={meals} alt="food" />
      </div>
    </>
  );
}

export default Header;
