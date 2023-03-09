import React from 'react';
import Input from '../../UI/Input';
import style from './MealItemForm.module.css';

function MealItemFrom({ id }: { id: string }) {
  return (
    <form className={style.form} aria-label="form">
      <Input
        key={id}
        label="Amount"
        input={{
          id: `${id}`,
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1',
        }}
      />
      <button type="button">Add</button>
    </form>
  );
}

export default MealItemFrom;
