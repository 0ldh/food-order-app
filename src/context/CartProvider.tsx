import React, { useMemo, useReducer } from 'react';
import { MealItemProps } from '../components/Meals/MealItem/MealItem';
import CartContext, { Cart } from './CartContext';

type ADD = {
  type: 'ADD';
  item: MealItemProps;
  amount: number;
};
type REMOVE = {
  type: 'REMOVE';
  id: string;
};

type ACTIONTYPE = ADD | REMOVE;

// 카트의 초기값
const defaultCart: Cart = {
  items: [],
  totalPrice: 0,
};

// reducer 함수: 이전 상태와 액션을 받아 새로운 상태를 반환
const reducer = (state: Cart, action: ACTIONTYPE) => {
  switch (action.type) {
    // ADD 액션
    case 'ADD': {
      // 이미 카트에 추가된 아이템의 인덱스를 찾음
      const existingItemIndex = state.items.findIndex((item) => item.mealItem.id === action.item.id);
      // 이미 추가된 아이템일 경우
      if (existingItemIndex !== -1) {
        const existingItem = state.items[existingItemIndex];
        const updatedItem = {
          ...existingItem,
          amount: existingItem.amount + action.amount, // 수량 증가
        };
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex] = updatedItem; // 기존 아이템 대체
        const updatedTotalPrice = state.totalPrice + action.item.price * action.amount; // 총 가격 업데이트
        return {
          items: updatedItems,
          totalPrice: updatedTotalPrice,
        };
      }
      // 새로운 아이템일 경우
      const updatedItems = state.items.concat({
        mealItem: action.item,
        amount: action.amount,
      });
      const updatedTotalPrice = state.totalPrice + action.item.price * action.amount; // 총 가격 업데이트
      return {
        items: updatedItems,
        totalPrice: updatedTotalPrice,
      };
    }
    // REMOVE 액션
    case 'REMOVE': {
      const existingItemIndex = state.items.findIndex((item) => item.mealItem.id === action.id); // 해당 아이템의 인덱스를 찾음
      const existingItem = state.items[existingItemIndex];
      const updatedTotalPrice = state.totalPrice - existingItem.mealItem.price * existingItem.amount; // 총 가격 업데이트
      let updatedItems;
      if (existingItem.amount === 1) { // 수량이 1일 경우
        updatedItems = state.items.filter((item) => item.mealItem.id !== action.id); // 해당 아이템 제거
      } else {
        const updatedItem = { ...existingItem, amount: existingItem.amount - 1 }; // 수량 감소
        updatedItems = [...state.items];
        updatedItems[existingItemIndex] = updatedItem; // 기존 아이템 대체
      }
      return {
        items: updatedItems,
        totalPrice: updatedTotalPrice,
      };
    }
    default:
      throw new Error('Invalid action type!');
  }
};

function CartProvider({ children }: { children: React.ReactNode }) {
  // useReducer 함수로 상태와 액션 처리 기능을 가진 reducer 함수를 사용
  const [cartState, dispatchCartAction] = useReducer(reducer, defaultCart);

  // 카트에 아이템 추가하는 함수
  const addItemToCartHandler = (item: MealItemProps) => {
    dispatchCartAction({
      type: 'ADD',
      item,
      amount: 1,
    });
  };

  // 카트에서 아이템 제거하는 함수
  const removeItemFromCartHandler = (id: string) => {
    dispatchCartAction({
      type: 'REMOVE',
      id,
    });
  };

  // useMemo를 사용해 최적화된 카트 컨텍스트 생성
  const cartContext = useMemo(() => ({
    items: cartState.items,
    totalPrice: cartState.totalPrice,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  }), [cartState.items, cartState.totalPrice]);

  // 카트 컨텍스트를 제공하는 CartProvider 컴포넌트 반환
  return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>;
}

export default CartProvider;
