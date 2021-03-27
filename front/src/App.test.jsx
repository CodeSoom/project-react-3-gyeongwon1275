import React from 'react';

import { render, screen } from '@testing-library/react';

import App from './App';

describe('App', () => {
  test('renders Header', () => {
    render(<App />);

    expect(screen.getByText('AnimalPhy')).toBeInTheDocument();
  });
});
