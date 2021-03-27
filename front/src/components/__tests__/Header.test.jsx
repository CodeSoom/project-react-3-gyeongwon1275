import React from 'react';

import { render, screen } from '@testing-library/react';

import Header from '../Header';

describe('Header', () => {
  it('renders LOGO and upload icon button', () => {
    render(<Header />);

    expect(screen.getByText('AnimalPhy')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'plus-circle' })).toBeInTheDocument();
  });
});
