import React from 'react';
import { render, screen } from '@testing-library/react';
import AppTodolist from './APP/Body/AppTodolist';

test('renders learn react link', () => {
  render(<AppTodolist />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
