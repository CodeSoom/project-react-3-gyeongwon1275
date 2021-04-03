import React from 'react';

import { render, screen } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import given from 'given2';

import ImagesContainer from '../ImagesContainer';

import mockImages from '../../feature/mockData';

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

  context('without images', () => {
    it('renders text "loading..."', () => {
      given('images', () => []);
      render(<ImagesContainer />);
      expect(screen.getByText('loading...')).toBeInTheDocument();
    });
  });

  context('with images', () => {
    it('renders Images', () => {
      given('images', () => mockImages);
      render(<ImagesContainer />);
      expect(screen.getByRole('img')).toBeInTheDocument();
    });
  });
});
