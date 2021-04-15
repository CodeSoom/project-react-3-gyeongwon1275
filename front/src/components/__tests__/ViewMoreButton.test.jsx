import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';

import ViewMoreButton from '../ViewMoreButton';

describe('ViewMoreButton', () => {
  const onClick = jest.fn();

  beforeEach(() => {
    onClick.mockClear();
  });

  context('with viewMoreButtonVisible', () => {
    it('renders "더보기" button', () => {
      render((
        <ViewMoreButton
          viewMoreButtonVisible
          onClick={onClick}
        />));

      expect(screen.getByRole('button', { name: '더보기' })).toBeInTheDocument();
    });

    it('listens click event ', () => {
      render((
        <ViewMoreButton
          viewMoreButtonVisible
          onClick={onClick}
        />));

      const button = screen.getByRole('button', { name: '더보기' });
      fireEvent.click(button);
      expect(onClick).toHaveBeenCalled();
    });
  });

  context('without viewMoreButtonVisible', () => {
    it("doesn't render '더보기' button", () => {
      render(<ViewMoreButton />);

      expect(screen.queryByRole('button', { name: '더보기' })).not.toBeInTheDocument();
    });
  });
});
