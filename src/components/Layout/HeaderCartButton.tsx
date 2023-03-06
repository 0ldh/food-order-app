import React from 'react';
import CartIcon from '../Cart/CartIcon';
import style from './HeaderCartButton.module.css';

function HeaderCartButton() {
  return (
    <button type="button" className={style.button}>
      <span className={style.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={style.badge}>
        3
      </span>
    </button>
  );
}

export default HeaderCartButton;
