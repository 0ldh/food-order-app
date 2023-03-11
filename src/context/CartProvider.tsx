import React, { useMemo, useReducer } from 'react';
import { MealItemProps } from '../components/Meals/MealItem/MealItem';
import CartContext, { Cart } from './CartContext';

// 액션 타입 정의
type ADD = {
  type: 'ADD';
  item: MealItemProps;
  amount: number;
};
type REMOVE = {
  type: 'REMOVE';
  id: string;
};

// 액션 타입 유니온 타입으로 정의
type ACTIONTYPE = ADD | REMOVE;

// 카트의 초기 상태
const defaultCart: Cart = {
  items: [],
  totalPrice: 0,
};

// 리듀서 함수
const reducer = (state: Cart, action: ACTIONTYPE) => {
  switch (action.type) {
    case 'ADD': { // ADD 액션 처리
      const existingItemIndex = state.items.findIndex((item) => item.mealItem.id === action.item.id); // 이미 카트에 있는 아이템의 인덱스 찾기
      const existingItem = state.items[existingItemIndex]; // 이미 카트에 있는 아이템
      let updatedItems;
      if (existingItem) { // 이미 카트에 있는 아이템이면
        const updatedItem = { // 수량을 더한 새로운 아이템 생성
          ...existingItem,
          amount: existingItem.amount + action.amount,
        };
        updatedItems = [...state.items]; // 기존 아이템 배열 복사
        updatedItems[existingItemIndex] = updatedItem; // 새로운 아이템으로 교체
      } else { // 카트에 없는 아이템이면
        updatedItems = state.items.concat({ // 새로운 아이템 추가
          mealItem: action.item,
          amount: action.amount,
        });
      }
      const updatedTotalPrice = state.totalPrice + action.amount * action.item.price; // 총 가격 계산
      return {
        items: updatedItems,
        totalPrice: updatedTotalPrice,
      };
    }
    case 'REMOVE': { // REMOVE 액션 처리
      const existingItemIndex = state.items.findIndex((item) => item.mealItem.id === action.id); // 삭제할 아이템의 인덱스 찾기
      const existingItem = state.items[existingItemIndex]; // 삭제할 아이템
      const updatedTotalPrice = state.totalPrice - existingItem.mealItem.price; // 총 가격 계산
      let updatedItems;
      if (existingItem.amount === 1) { // 삭제할 아이템의 수량이 1이면
        updatedItems = state.items.filter((item) => item.mealItem.id !== action.id); // 아이템 삭제
      } else { // 삭제할 아이템의 수량이 1보다 크면
        const updatedItem = { ...existingItem, amount: existingItem.amount - 1 }; // 수량을 뺀 새로운 아이템 생성
        updatedItems = [...state.items]; // 기존 아이템 배열 복사
        updatedItems[existingItemIndex] = updatedItem; // 새로운 아이템으로 교체
      }
      return {
        items: updatedItems,
        totalPrice: updatedTotalPrice,
      };
    }
    default:
      throw new Error('Invalid action type!'); // 액션 타입이 유효하지 않으면 에러 발생
  }
};

function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartState, dispatchCartAction] = useReducer(reducer, defaultCart); // 리듀서 함수와 초기 상태로 카트 상태와 디스패치 함수 생성

  const addItemToCartHandler = (item: MealItemProps, amount: number) => { // 카트에 아이템 추가하는 핸들러 함수
    dispatchCartAction({
      type: 'ADD',
      item,
      amount,
    });
  };

  const removeItemFromCartHandler = (id: string) => { // 카트에서 아이템 삭제하는 핸들러 함수
    dispatchCartAction({
      type: 'REMOVE',
      id,
    });
  };

  const cartContext = useMemo(() => ({ // 카트 컨텍스트 생성
    ...cartState,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  }), [cartState, addItemToCartHandler, removeItemFromCartHandler]);

  return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>; // 카트 컨텍스트 제공
}

export default CartProvider;
