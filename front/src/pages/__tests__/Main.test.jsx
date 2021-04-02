import React from 'react';

import { render, screen } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import { initialState } from '../../data/postReducer';

import Main from '../Main';

describe('Main', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
    useDispatch.mockImplementation(() => dispatch);
    useSelector.mockImplementation((selector) => selector({
      post: initialState,
    }));
  });

  it('renders PostsContainer', () => {
    render(<Main />);
    expect(screen.getByText('loading...')).toBeInTheDocument();
  });
});
