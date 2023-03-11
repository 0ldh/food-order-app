import React, { useContext, useRef, useState } from 'react';
import Input from '../../UI/Input';
import styles from './MealItemForm.module.css';
import CartContext from '../../../context/CartContext';

interface MealItemFormProps {
  id: string;
  name: string;
  description: string;
  price: number;
}

function MealItemFrom({
  id, name, description, price,
}: MealItemFormProps) {
  const { addItem } = useContext(CartContext);
  const [amount, setAmount] = useState<number>(1);
  const inputRef = useRef(null);

  const mealItem = {
    id,
    name,
    description,
    price,
  };

  const addItemHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = inputRef.current as unknown as HTMLInputElement;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    inputRef.current ? input.value = String(amount) : null;
    addItem({ mealItem, amount });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value));
  };

  return (
    <form className={styles.form} onSubmit={addItemHandler}>
      <Input
        key={id}
        label="Amount"
        input={{
          id: `${id}`,
          ref: inputRef,
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1',
          onChange,
        }}
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default MealItemFrom;
