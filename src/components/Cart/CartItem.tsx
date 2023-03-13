import React, { useContext } from 'react';
import styles from './CartItem.module.css';
import CartContext from '../../context/CartContext';

interface Item {
  mealItem: {
    id: string;
    name: string;
    description: string;
    price: number;
  };
  amount: number;
}
interface CartItemProps {
  id: string;
  price: number;
  name: string;
  amount: number;
  onAdd: ({ mealItem, amount }: Item) => void;
  onRemove: (id: string) => void;
}

function CartItem({
  id, price, name, amount, onAdd, onRemove,
}: CartItemProps) {
  const { items } = useContext(CartContext);
  console.log(items);

  const mealItem = {
    id: 'm1',
    name: 'sushi',
    description: 'string',
    price: 123.9,
  };

  const cartItemAddHandler = () => {
    onAdd({
      mealItem,
      amount: 1,
    });
  };
  const cartItemRemoveHandler = () => {
    // onRemove();
  };

  return (
    <li className={styles['cart-item']}>
      <div>
        <h2>{name}</h2>
        <div className={styles.summary}>
          <span className={styles.price}>{price.toFixed(2)}</span>
          <span className={styles.amount}>
            x
            {amount}
          </span>
        </div>
      </div>
      <div className={styles.actions}>
        <button type="button" onClick={cartItemAddHandler}>−</button>
        <button type="button" onClick={cartItemRemoveHandler}>+</button>
      </div>
    </li>
  );
}

export default CartItem;
