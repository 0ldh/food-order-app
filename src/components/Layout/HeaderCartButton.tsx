import React, { useContext, useEffect, useState } from 'react';
import CartContext from '../../context/CartContext';
import CartIcon from '../Cart/CartIcon';
import styles from './HeaderCartButton.module.css';

interface HeaderCartButtonProps {
  onShowCart: () => void;
}

function HeaderCartButton({ onShowCart }: HeaderCartButtonProps) {
  const { items } = useContext(CartContext);
  const [btnAni, setBtnAni] = useState<boolean>(false);
  const cartCount = items.length;
  const btnAniClass = `${styles.button} ${btnAni ? styles.bump : ''}`;
  useEffect(() => {
    if (items.length === 0) return;
    setBtnAni(true);
    const timer = setTimeout(() => {
      setBtnAni(false);
    }, 300);

    // eslint-disable-next-line consistent-return
    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button type="button" className={btnAniClass} onClick={onShowCart}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>{cartCount}</span>
    </button>
  );
}

export default HeaderCartButton;
