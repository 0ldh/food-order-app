import { createContext } from 'react';
import { MealItemProps } from '../components/Meals/MealItem/MealItem';

export interface Cart {
  items: { mealItem: MealItemProps; amount: number }[];
  totalPrice: number;
}

const defaultCart: Cart = { items: [], totalPrice: 0 };

const CartContext = createContext<Cart>(defaultCart);

export default CartContext;
