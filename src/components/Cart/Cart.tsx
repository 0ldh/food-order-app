import React, { useContext } from 'react';
import Modal from '../UI/Modal';
import styles from './Cart.module.css';
import CartContext from '../../context/CartContext';

interface CartProps {
  onHideCart: () => void;
}
function TotalAmount({ totalAmount }: { totalAmount: number }) {
  return (
    <div className={styles.total}>
      <span>Total Amount</span>
      <span>{totalAmount}</span>
    </div>
  );
}
function TotalPrice({ totalPrice }: { totalPrice: number }) {
  return (
    <div className={styles.total}>
      <span>Total Price</span>
      <span>{totalPrice.toFixed(2)}</span>
    </div>
  );
}

function Cart({ onHideCart }: CartProps) {
  const { items, totalPrice } = useContext(CartContext);

  const cartItemElements = items.map((item) => (
    <li key={item.mealItem.id}>
      <div>{item.mealItem.name}</div>
      <input type="number" value={item.amount} readOnly />
    </li>
  ));
  const totalAmount = items.reduce((acc, item) => acc + item.amount, 0);

  return (
    <Modal onHideCart={onHideCart}>
      <ul className={styles['cart-items']}>{cartItemElements}</ul>
      <TotalAmount totalAmount={totalAmount} />
      <TotalPrice totalPrice={totalPrice} />
      <div className={styles.actions}>
        <button type="button" className={styles['button--alt']} onClick={onHideCart}>Close</button>
        <button type="button" className={styles.button}>Order</button>
      </div>
    </Modal>
  );
}

export default Cart;
