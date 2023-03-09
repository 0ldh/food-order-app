import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from './Card';

describe('Card component', () => {
  it('renders children correctly', () => {
    const { getByText } = render(<Card>Test</Card>);
    expect(getByText('Test')).toBeInTheDocument();
  });

  it('has the correct CSS class', () => {
    const { container } = render(<Card>Test</Card>);
    expect(container.firstChild).toHaveClass('card');
  });
});
