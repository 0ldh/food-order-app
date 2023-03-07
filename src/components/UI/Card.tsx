import React from 'react';
import style from './Card.module.css';

interface CardProps {
  children: React.ReactNode;
}

function Card({ children }: CardProps) {
  return (
    <div className={style.card}>
      {children}
    </div>
  );
}

export default Card;
