import { createContext } from 'react';

interface Item {
  mealItem: {
    id: string;
    name: string;
    description: string;
    price: number;
  };
  amount: number;
}
export interface Cart {
  items: Item[];
  totalPrice: number;
  addItem: ({ mealItem, amount }: Item) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

const defaultCart: Cart = {
  items: [],
  totalPrice: 0,
  addItem: () => {},
  removeItem: () => {},
  clearCart: () => {},
};

const CartContext = createContext(defaultCart);

export default CartContext;
