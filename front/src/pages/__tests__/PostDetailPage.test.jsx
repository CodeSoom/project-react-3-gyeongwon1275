import React from 'react';

import { render, screen } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import { MemoryRouter } from 'react-router-dom';

import { initialState } from '../../data/postReducer';

import PostDetailPage from '../PostDetailPage';

describe('PostDetailPage', () => {
  beforeEach(() => {
    const dispatch = jest.fn();
    useDispatch.mockImplementation(() => dispatch);
    useSelector.mockImplementation((selector) => selector({
      post: initialState,
    }));
  });

  context('with params props', () => {
    it('renders loading...', () => {
      render((
        <PostDetailPage params={5} />
      ));
      expect(screen.getByText('loading...')).toBeInTheDocument();
    });
  });

  context('without params props', () => {
    it('renders loading...', () => {
      render((
        <MemoryRouter>
          <PostDetailPage />
        </MemoryRouter>
      ));

      expect(screen.getByText('loading...')).toBeInTheDocument();
    });
  });
});
