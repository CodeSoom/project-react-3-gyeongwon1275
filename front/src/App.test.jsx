import React from 'react';

import { render, screen } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import App from './App';

import { initialState } from './data/postReducer';

describe('App', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
    useDispatch.mockImplementation(() => dispatch);
    useSelector.mockImplementation((selector) => selector({
      post: initialState,
    }));
  });

  it('renders Header', () => {
    render(<App />);

    expect(screen.getByText('AnimalPhy')).toBeInTheDocument();
  });
});
