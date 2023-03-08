import React from 'react';
import style from './MealItem.module.css';
import MealItemFrom from './MealItemForm';

export interface MealItemProps {
  id: string;
  name: string;
  description: string;
  price: number;
}

function MealItem({
  id, name, description, price,
}: MealItemProps) {
  const mealPrice = price.toFixed(2);

  return (
    <li className={style.meal}>
      <div>
        <h3>{name}</h3>
        <div className={style.description}>{description}</div>
        <div className={style.price}>{`$${mealPrice}`}</div>
      </div>
      <div>
        <MealItemFrom id={id} />
      </div>
    </li>
  );
}

export default MealItem;
