import React from 'react';

import { render, screen } from '@testing-library/react';

import Post from '../Post';

describe('Post', () => {
  it('renders image ', () => {
    render(<Post src="image" />);

    expect(screen.getByRole('img')).toBeInTheDocument();
  });
});
