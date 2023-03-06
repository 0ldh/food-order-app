/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import style from './Input.module.css';

interface InputProps {
  label: string;
  input: React.HTMLProps<HTMLInputElement>;
}

function Input({ label, input }: InputProps) {
  return (
    <div className={style.input}>
      <label htmlFor={input.id}>{label}</label>
      <input {...input} />
    </div>
  );
}

export default Input;
