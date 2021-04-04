import React from 'react';

import { render, screen, fireEvent } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import given from 'given2';

import { MemoryRouter } from 'react-router-dom';

import ImagesContainer from '../ImagesContainer';

import { mockImages } from '../../feature/mockData';

const mockPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory() {
    return { push: mockPush };
  },
}));

describe('ImagesContainer', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      post: {
        images: given.images,
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
});
