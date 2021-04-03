import React from 'react';

import { render, screen } from '@testing-library/react';

import Image from '../Image';

describe('Image', () => {
  it('renders image ', () => {
    render(<Image src="image" />);

    expect(screen.getByRole('img')).toBeInTheDocument();
  });
});
