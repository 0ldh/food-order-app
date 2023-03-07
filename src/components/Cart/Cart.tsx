import React from 'react';
import Modal from '../UI/Modal';
import style from './Cart.module.css';

interface CartProps {
  onHideCart: () => void;
}

function Cart({ onHideCart }: CartProps) {
  const cartItem = [{
    id: 'c1',
    name: 'sushi',
    price: 12.99,
  }].map((item) => <li>{item.name}</li>);
  const cartItems = <ul className={style['cart-items']}>{cartItem}</ul>;

  return (
    <Modal onHideCart={onHideCart}>
      {cartItems}
      <div className={style.total}>
        <span>Total Amount</span>
        <span>35.62</span>
      </div>
      <div className={style.actions}>
        <button type="button" className={style['button--alt']} onClick={onHideCart}>Close</button>
        <button type="button" className={style.button}>Order</button>
      </div>
    </Modal>
  );
}

export default Cart;
