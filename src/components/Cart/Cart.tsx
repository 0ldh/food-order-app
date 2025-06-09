import React, { useContext, useState } from 'react'; // 리액트와 useContext를 불러옴
import Modal from '../UI/Modal'; // Modal 컴포넌트를 불러옴
import styles from './Cart.module.css'; // CSS 모듈을 불러옴
import CartContext from '../../context/CartContext'; // CartContext를 불러옴
import CartItem from './CartItem';
import Checkout, { OrderData } from './Checkout';

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
    items, totalPrice, addItem, removeItem, clearCart,
  } = useContext(CartContext); // CartContext에서 items와 totalPrice를 가져옴

  const [isCheckingOut, setIsCheckingOut] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [orderSuccess, setOrderSuccess] = useState<boolean>(false);
  const [orderError, setOrderError] = useState<string>('');

  const totalAmount = items.reduce((acc, item) => acc + item.amount, 0); // items 배열의 수량을 합산하여 totalAmount 변수에 할당

  const handleOrderClick = () => {
    setIsCheckingOut(true);
    setOrderError(''); // Clear any previous errors
  };

  const handleCheckoutCancel = () => {
    setIsCheckingOut(false);
  };

  const handleOrderConfirm = async (orderData: OrderData) => {
    setIsSubmitting(true);
    setOrderError(''); // Clear any previous errors
    
    try {
      // 실제 주문 API 호출을 시뮬레이션
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // 10% 확률로 실패 시뮬레이션
          if (Math.random() < 0.1) {
            reject(new Error('Network error'));
          } else {
            resolve(undefined);
          }
        }, 1000);
      });
      
      // 주문 성공
      clearCart();
      setOrderSuccess(true);
      setIsCheckingOut(false);
    } catch (error) {
      console.error('Order failed:', error);
      setOrderError('주문 처리 중 오류가 발생했습니다. 다시 시도해주세요.');
      setIsSubmitting(false);
      return; // Don't proceed to success state
    } finally {
      if (!orderError) {
        setIsSubmitting(false);
      }
    }
  };

  const handleClearCart = () => {
    const confirmClear = window.confirm('정말로 장바구니를 비우시겠습니까?');
    if (confirmClear) {
      clearCart();
      onHideCart(); // 카트를 비운 후 모달 닫기
    }
  };

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

  if (orderSuccess) {
    return (
      <Modal onHideCart={onHideCart}>
        <div className={styles.success}>
          <h2>Order Successful!</h2>
          <p>Your order has been placed successfully. Thank you for your purchase!</p>
          <div className={styles.actions}>
            <button type="button" className={styles.button} onClick={onHideCart}>
              Close
            </button>
          </div>
        </div>
      </Modal>
    );
  }

  return ( // JSX 반환
    <Modal onHideCart={onHideCart}>
      {!isCheckingOut && (
        <>
          <ul className={styles['cart-items']}>{cartItemElements}</ul>
          <TotalAmount totalAmount={totalAmount} />
          <TotalPrice totalPrice={totalPrice} />
          <div className={styles.actions}>
            <button type="button" className={styles['button--alt']} onClick={onHideCart}>Close</button>
            {totalAmount > 0 && (
              <>
                <button type="button" className={styles['button--clear']} onClick={handleClearCart}>
                  Clear Cart
                </button>
                <button type="button" className={styles.button} onClick={handleOrderClick}>
                  Order
                </button>
              </>
            )}
          </div>
        </>
      )}
      
      {isCheckingOut && (
        <>
          <Checkout 
            onCancel={handleCheckoutCancel}
            onConfirm={handleOrderConfirm}
          />
          {orderError && (
            <div className={styles.error}>
              <p>{orderError}</p>
              <button 
                type="button" 
                className={styles['button--alt']} 
                onClick={() => setOrderError('')}
              >
                Close
              </button>
            </div>
          )}
        </>
      )}
      
      {isSubmitting && (
        <div className={styles.submitting}>
          <p>Submitting order...</p>
        </div>
      )}
    </Modal>
  );
}

export default Cart; // Cart 컴포넌트를 내보냄
