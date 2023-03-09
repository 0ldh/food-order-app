import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Input from './Input';

describe('Input component', () => {
  it('renders the label and input', () => {
    const label = 'Name';
    const inputProps = { id: 'name', type: 'text', value: 'John Doe' };
    render(<Input label={label} input={inputProps} />);
    expect(screen.getByLabelText(label)).toBeInTheDocument();
    expect(screen.getByDisplayValue(inputProps.value)).toBeInTheDocument();
  });

  it('calls the onChange function when input value changes', () => {
    const label = 'Email';
    const inputProps = {
      id: 'email', type: 'email', value: 'johndoe@example.com', onChange: jest.fn(),
    };
    render(<Input label={label} input={inputProps} />);
    const newEmail = 'janedoe@example.com';
    const input = screen.getByLabelText(label);
    userEvent.clear(input);
    userEvent.type(input, newEmail);
    expect(inputProps.onChange).toHaveBeenCalledTimes(newEmail.length + 1);
    expect(inputProps.onChange).toHaveBeenCalledWith(expect.any(Object));
  });
});
