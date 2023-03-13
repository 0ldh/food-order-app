import React, { useContext } from 'react'; // 리액트와 useContext를 불러옴
import Modal from '../UI/Modal'; // Modal 컴포넌트를 불러옴
import styles from './Cart.module.css'; // CSS 모듈을 불러옴
import CartContext from '../../context/CartContext'; // CartContext를 불러옴
import CartItem from './CartItem';

interface CartProps { // CartProps 인터페이스를 정의
  onHideCart: () => void; // onHideCart 함수를 정의
}

function TotalAmount({ totalAmount }: { totalAmount: number }) { // TotalAmount 컴포넌트를 정의
  return ( // JSX 반환
    <div className={styles.total}>
      <span>Total Amount</span>
      <span>{totalAmount}</span>
    </div>
  );
}

function TotalPrice({ totalPrice }: { totalPrice: number }) { // TotalPrice 컴포넌트를 정의
  return ( // JSX 반환
    <div className={styles.total}>
      <span>Total Price</span>
      <span>{`$${totalPrice.toFixed(2)}`}</span>
    </div>
  );
}

function Cart({ onHideCart }: CartProps) { // Cart 컴포넌트를 정의
  const {
    items, totalPrice, addItem, removeItem,
  } = useContext(CartContext); // CartContext에서 items와 totalPrice를 가져옴

  const totalAmount = items.reduce((acc, item) => acc + item.amount, 0); // items 배열의 수량을 합산하여 totalAmount 변수에 할당
  const cartItemElements = items.map((item) => ( // items 배열을 순회하며 JSX 반환
    <CartItem
      key={item.mealItem.id}
      id={item.mealItem.id}
      price={item.mealItem.price}
      name={item.mealItem.name}
      amount={item.amount}
      onAdd={addItem}
      onRemove={removeItem}
    />
  ));

  return ( // JSX 반환
    <Modal onHideCart={onHideCart}>
      <ul className={styles['cart-items']}>{cartItemElements}</ul>
      <TotalAmount totalAmount={totalAmount} />
      <TotalPrice totalPrice={totalPrice} />
      <div className={styles.actions}>
        <button type="button" className={styles['button--alt']} onClick={onHideCart}>Close</button>
        {totalAmount > 0 && <button type="button" className={styles.button}>Order</button>}
      </div>
    </Modal>
  );
}

export default Cart; // Cart 컴포넌트를 내보냄
