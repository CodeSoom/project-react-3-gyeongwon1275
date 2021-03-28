import React from 'react';

import { render, screen } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import Header from '../Header';

import { initialState } from '../../data/postReducer';

describe('Header', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
    useDispatch.mockImplementation(() => dispatch);
    useSelector.mockImplementation((selector) => selector({
      post: initialState,
    }));
  });

  it('renders LOGO and upload icon button', () => {
    render(<Header />);

    expect(screen.getByText('AnimalPhy')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'plus-circle' })).toBeInTheDocument();
  });
});
