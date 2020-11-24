import React from 'react';
import { render, screen } from '@testing-library/react';
import Counter from './Counter';

test('Counter: default counter should be zero', () => {
    render(<Counter />);
    const counter = screen.getByTestId("counter");
    expect(counter).toHaveTextContent("0")
});

test('Counter: counter should be incremented by one', () => {
    render(<Counter />);

    const increment = screen.getByTestId("increment");
    increment.click()

    const counter = screen.getByTestId("counter");
    expect(counter).toHaveTextContent("1")
});
