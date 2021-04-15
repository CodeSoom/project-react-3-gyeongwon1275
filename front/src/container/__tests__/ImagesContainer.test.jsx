import React from 'react';

import { render, screen, fireEvent } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import given from 'given2';

import { MemoryRouter } from 'react-router-dom';

import ImagesContainer from '../ImagesContainer';

import { mockImages } from '../../feature/mockData';
import { setViewMoreButtonVisible } from '../../data/postReducer';

const mockPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory() {
    return { push: mockPush };
  },
}));

describe('ImagesContainer', () => {
  const dispatch = jest.fn();
  const onScroll = jest.fn();
  const addEventListener = jest.spyOn(document, 'addEventListener');

  beforeEach(() => {
    dispatch.mockClear();
    addEventListener.mockClear();
    onScroll.mockClear();

    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      post: {
        images: given.images,
        viewMoreButtonVisible: given.viewMoreButtonVisible,
      },
    }));
  });

  function renderImageContainer() {
    return render((
      <MemoryRouter>
        <ImagesContainer />
      </MemoryRouter>
    ));
  }

  context('without images', () => {
    it('renders text "loading..."', () => {
      given('images', () => []);
      renderImageContainer();
      expect(screen.getByText('loading...')).toBeInTheDocument();
    });
  });

  context('with images', () => {
    it('renders Images', () => {
      given('images', () => mockImages);
      renderImageContainer();
      expect(screen.getByRole('img')).toBeInTheDocument();
    });
  });

  context('when click image', () => {
    it('occurs handle event', () => {
      given('images', () => mockImages);
      renderImageContainer();

      fireEvent.click(screen.getByRole('img'));

      expect(mockPush).toBeCalledWith('post/1');
    });
  });

  context('when element has totally scrolled without viewMoreButtonVisible', () => {
    it('shows "더보기" button', async () => {
      given('images', () => mockImages);
      given('viewMoreButtonVisible', () => false);

      renderImageContainer();

      expect(addEventListener).toHaveBeenCalled();
    });
  });

  context('when clicked "더보기" button with viewMoreButtonVisible', () => {
    it('updates image list', () => {
      given('images', () => mockImages);
      given('viewMoreButtonVisible', () => true);

      renderImageContainer();

      const button = screen.getByRole('button', { name: '더보기' });

      fireEvent.click(button);

      expect(dispatch).toHaveBeenCalledTimes(3);
      expect(dispatch).toHaveBeenCalledWith(setViewMoreButtonVisible(false));
    });
  });
});
