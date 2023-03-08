import React, { useReducer } from 'react';
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

const defaultCart: Cart = {
  items: [],
  totalPrice: 0,
};

const reducer = (state: Cart, action: ACTIONTYPE) => {
  switch (action.type) {
    case 'ADD': {
      const initItem = state.items.find((e) => e.mealItem.id === action.item.id);
      if (initItem) {
        initItem.amount += action.amount;
        return {
          ...state,
          items: [...state.items],
        };
      }

      const newItem = {
        mealItem: action.item,
        amount: action.amount,
      };
      return {
        ...state,
        items: [...state.items, newItem],
      };
    }
    case 'REMOVE': {
      return {
        ...state,
        items: state.items.filter((item) => item.mealItem.id !== action.id),
      };
    }

    default:
      throw new Error('Please check ACTIONTYPE');
  }
};

function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, defaultCart);

  const addItemHandler = (item: MealItemProps, amount: number) => {
    dispatch({ type: 'ADD', item, amount });
  };
  const removeItemHandler = (id: string) => {
    dispatch({ type: 'REMOVE', id });
  };

  // eslint-disable-next-line react/jsx-no-constructed-context-values

  return (
    <CartContext.Provider value={defaultCart}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
