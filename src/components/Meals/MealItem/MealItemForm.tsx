import React from 'react';
import Input from '../../UI/Input';
import style from './MealItemForm.module.css';

interface MealItemFormProps {
  id: string;
}

const inputProps = {
  type: 'number',
  min: '1',
  max: '5',
  step: '1',
  defaultValue: '1',
};

function MealItemForm({ id }: MealItemFormProps) {
  return (
    <form className={style.form} aria-label="form">
      <Input label="Amount" input={{ ...inputProps, id }} />
      <button type="button">Add</button>
    </form>
  );
}

export default MealItemForm;
