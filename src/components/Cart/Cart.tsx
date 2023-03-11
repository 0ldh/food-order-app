import React, { useContext } from 'react';
import Modal from '../UI/Modal';
import styles from './Cart.module.css';
import CartContext from '../../context/CartContext';

interface CartProps {
  onHideCart: () => void;
}

function Cart({ onHideCart }: CartProps) {
  const { items, totalPrice } = useContext(CartContext);

  const cartItemElements = items.map((item) => <li key={item.mealItem.id}>{item.mealItem.name}</li>);

  return (
    <Modal onHideCart={onHideCart}>
      <ul className={styles['cart-items']}>{cartItemElements}</ul>
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalPrice.toFixed(2)}</span>
      </div>
      <div className={styles.actions}>
        <button type="button" className={styles['button--alt']} onClick={onHideCart}>Close</button>
        <button type="button" className={styles.button}>Order</button>
      </div>
    </Modal>
  );
}

export default Cart;
