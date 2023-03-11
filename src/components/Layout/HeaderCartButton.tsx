import React, { useContext } from 'react';
import CartContext, { Cart } from '../../context/CartContext';
import CartIcon from '../Cart/CartIcon';
import styles from './HeaderCartButton.module.css';

interface HeaderCartButtonProps {
  onShowCart: () => void;
}

function HeaderCartButton({ onShowCart }: HeaderCartButtonProps) {
  const cartCount = useContext<Cart>(CartContext).items.length;

  return (
    <button type="button" className={styles.button} onClick={onShowCart}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>
        {cartCount}
      </span>
    </button>
  );
}

export default HeaderCartButton;
