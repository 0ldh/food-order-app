import React, { useCallback, useMemo, useReducer } from 'react';
import CartContext, { Cart } from './CartContext';

// 액션 타입 정의
type ADD = {
  type: 'ADD';
  mealItem: {
    id: string;
    name: string;
    description: string;
    price: number;
  };
  amount: number;
};
type REMOVE = {
  type: 'REMOVE';
  id: string;
};

// 액션 타입 유니온 타입으로 정의
type ACTIONTYPE = ADD | REMOVE;

interface AddItemProps {
  mealItem: {
    id: string;
    name: string;
    description: string;
    price: number;
  };
  amount: number;
}

// 카트의 초기 상태
const defaultCart: Cart = {
  items: [],
  totalPrice: 0,
  addItem: () => {},
  removeItem: () => {},
};

// 리듀서 함수
const reducer = (state: Cart, action: ACTIONTYPE) => {
  switch (action.type) {
    case 'ADD': { // ADD 액션 처리
      const existingItemIndex = state.items.findIndex((item) => item.mealItem.id === action.mealItem.id); // 이미 카트에 있는 아이템의 인덱스 찾기
      const existingItem = state.items[existingItemIndex]; // 이미 카트에 있는 아이템

      const updatedItems = existingItem // 이미 카트에 있는 아이템이 있으면 수량만 업데이트
        ? [...state.items].map((item) => (
          item.mealItem.id === action.mealItem.id
            ? { ...item, amount: item.amount + action.amount }
            : item
        ))
        : [...state.items, { mealItem: action.mealItem, amount: action.amount }]; // 없으면 새로운 아이템 추가

      const updatedTotalPrice = state.totalPrice + action.amount * action.mealItem.price; // 총 가격 업데이트

      return {
        ...state,
        items: updatedItems,
        totalPrice: updatedTotalPrice,
      };
    }

    case 'REMOVE': { // REMOVE 액션 처리
      const existingItemIndex = state.items.findIndex((item) => item.mealItem.id === action.id); // 삭제할 아이템의 인덱스 찾기
      const existingItem = state.items[existingItemIndex]; // 삭제할 아이템

      const updatedTotalPrice = state.totalPrice - existingItem.mealItem.price; // 총 가격 업데이트

      const updatedItems = existingItem.amount === 1 // 아이템 수량이 1이면 삭제
        ? state.items.filter((item) => item.mealItem.id !== action.id)
        : [...state.items].map((item) => (
          item.mealItem.id === action.id // 아이템 수량이 1보다 크면 수량만 업데이트
            ? { ...item, amount: item.amount - 1 }
            : item
        ));

      return {
        ...state,
        items: updatedItems,
        totalPrice: updatedTotalPrice,
      };
    }

    default:
      throw new Error('Invalid action type!');
  }
};

// 카트 컨텍스트를 제공하는 컴포넌트
function CartProvider({ children }: { children: React.ReactNode }) {
  // useReducer를 사용하여 카트 상태와 디스패치 함수를 가져옴
  const [cartState, dispatchCartAction] = useReducer(reducer, defaultCart);

  // 카트에 아이템을 추가하는 핸들러 함수
  const addItemToCartHandler = useCallback(({ mealItem, amount }: AddItemProps) => {
    dispatchCartAction({ type: 'ADD', mealItem, amount });
  }, []);

  // 카트에서 아이템을 제거하는 핸들러 함수
  const removeItemFromCartHandler = useCallback((id: string) => {
    dispatchCartAction({ type: 'REMOVE', id });
  }, []);

  // useMemo를 사용하여 카트 컨텍스트 객체를 생성
  const cartContext = useMemo(() => ({
    ...cartState,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  }), [cartState, addItemToCartHandler, removeItemFromCartHandler]);

  // 카트 컨텍스트를 제공하는 Provider 컴포넌트를 반환
  return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>;
}

export default CartProvider;
