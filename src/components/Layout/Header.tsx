import React from 'react';

import style from './Header.module.css';
import meals from '../../assets/meals.jpg';

function Header() {
  return (
    <>
      <header className={style.header}>
        <h1>MACdonald</h1>
        <button type="button">Cart</button>
      </header>
      <div className={style['main-image']}>
        <img src={meals} alt="food" />
      </div>
    </>
  );
}

export default Header;
