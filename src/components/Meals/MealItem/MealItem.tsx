import React from 'react';
import styles from './MealItem.module.css';
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
    <li className={styles.meal}>
      <div>
        <h3>{name}</h3>
        <div className={styles.description}>{description}</div>
        <div className={styles.price}>{`$${mealPrice}`}</div>
      </div>
      <div>
        <MealItemFrom id={id} name={name} description={description} price={price} />
      </div>
    </li>
  );
}

export default React.memo(MealItem);
