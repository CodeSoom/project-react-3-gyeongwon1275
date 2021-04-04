import React from 'react';

import { render, screen, fireEvent } from '@testing-library/react';

import Image from '../Image';

describe('Image', () => {
  const onClick = jest.fn();

  beforeEach(() => {
    onClick.mockClear();
  });

  it('renders image ', () => {
    render((
      <Image
        src="image"
        postId={1}
        onClick={onClick}
      />
    ));

    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();

    fireEvent.click(image);

    expect(onClick).toHaveBeenCalledWith(1);
  });
});
