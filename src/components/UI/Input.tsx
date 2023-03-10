/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styles from './Input.module.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

function Input({ label, ...rest }: InputProps) {
  return (
    <div className={styles.input}>
      <label htmlFor={rest.id}>{label}</label>
      <input {...rest} />
    </div>
  );
}

export default Input;
