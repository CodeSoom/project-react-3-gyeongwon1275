import React from 'react';

import { render, screen } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import {
  MemoryRouter,
} from 'react-router-dom';

import App from './App';

import { initialState } from './data/postReducer';

describe('App', () => {
  const dispatch = jest.fn();

  function renderApp({ path }) {
    return render((
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>
    ));
  }

  beforeEach(() => {
    dispatch.mockClear();
    useDispatch.mockImplementation(() => dispatch);
    useSelector.mockImplementation((selector) => selector({
      post: initialState,
    }));
  });

  context('with path /', () => {
    it('renders the main page', () => {
      renderApp({ path: '/' });

      expect(screen.getByText('loading...')).toBeInTheDocument();
    });
  });

  context('with path /post/:id', () => {
    it('renders the PostDetail page', () => {
      renderApp({ path: '/post/5' });

      expect(screen.getByText('loading...')).toBeInTheDocument();
    });
  });

  context('with undefined path', () => {
    it('renders the main page', () => {
      renderApp({ path: '/' });

      expect(screen.getByText('loading...')).toBeInTheDocument();
    });
  });
});
