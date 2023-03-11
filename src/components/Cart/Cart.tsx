import React from 'react';
import Modal from '../UI/Modal';
import styles from './Cart.module.css';

interface CartProps {
  onHideCart: () => void;
}

function Cart({ onHideCart }: CartProps) {
  const cartItem = [{
    id: 'c1',
    name: 'sushi',
    price: 12.99,
  }].map((item) => <li>{item.name}</li>);
  const cartItems = <ul className={styles['cart-items']}>{cartItem}</ul>;

  return (
    <Modal onHideCart={onHideCart}>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>35.62</span>
      </div>
      <div className={styles.actions}>
        <button type="button" className={styles['button--alt']} onClick={onHideCart}>Close</button>
        <button type="button" className={styles.button}>Order</button>
      </div>
    </Modal>
  );
}

export default Cart;
