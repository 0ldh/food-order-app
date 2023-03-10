import React, { useContext, useMemo } from 'react';
import CartContext from '../../context/CartContext';
import CartIcon from '../Cart/CartIcon';
import style from './HeaderCartButton.module.css';

interface HeaderCartButtonProps {
  onShowCart: () => void;
}

function HeaderCartButton({ onShowCart }: HeaderCartButtonProps) {
  const { items } = useContext(CartContext);
  const cartCount = useMemo(() => items.length, [items.length]);

  return (
    <button type="button" className={style.button} onClick={onShowCart}>
      <span className={style.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={style.badge}>
        {cartCount}
      </span>
    </button>
  );
}

export default HeaderCartButton;
