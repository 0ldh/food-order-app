import React from 'react';

import style from './Header.module.css';
import meals from '../../assets/meals.jpg';
import HeaderCartButton from './HeaderCartButton';

function Header() {
  return (
    <>
      <header className={style.header}>
        <h1>MACdonald</h1>
        <HeaderCartButton />
      </header>
      <div className={style['main-image']}>
        <img src={meals} alt="food" />
      </div>
    </>
  );
}

export default Header;
