import React from 'react';

import { render, screen } from '@testing-library/react';

import Logo from '../Logo';

describe('Logo', () => {
  it('renders LOGO', () => {
    render(<Logo />);

    expect(screen.getByText('AnimalPhy')).toBeInTheDocument();
  });
});
