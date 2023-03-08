import { createContext } from 'react';
import { MealItemProps } from '../components/Meals/MealItem/MealItem';

interface Item {
  mealItem: MealItemProps;
  amount: number;
}
export interface Cart {
  items: Item[];
  totalPrice: number;
}

const defaultCart: Cart = {
  items: [],
  totalPrice: 0,
};

const CartContext = createContext<Cart>(defaultCart);

export default CartContext;
