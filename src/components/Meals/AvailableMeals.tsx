import React from 'react';
import style from './AvailableMeals.module.css';

const DUMMY_MEALS = [
  {
    id: 'm1',
    name: 'Sushi',
    description: 'Finest fish and veggies',
    price: 22.99,
  },
  {
    id: 'm2',
    name: 'Schnitzel',
    description: 'A german specialty!',
    price: 16.5,
  },
  {
    id: 'm3',
    name: 'Barbecue Burger',
    description: 'American, raw, meaty',
    price: 12.99,
  },
  {
    id: 'm4',
    name: 'Green Bowl',
    description: 'Healthy...and green...',
    price: 18.99,
  },
];

function AvailableMeals() {
  const availableMealsList = DUMMY_MEALS.map((meal) => (
    <li id={meal.id}>{meal.name}</li>
  ));

  return (
    <section className={style.meals}>
      <ul>
        {availableMealsList}
      </ul>
    </section>
  );
}

export default AvailableMeals;
