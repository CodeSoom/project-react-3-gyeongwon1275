import React from 'react';

import { render, screen } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import Header from '../Header';

import { initialState as postState } from '../../data/postReducer';
import { initialState as userState } from '../../data/userReducer';

describe('Header', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
    useDispatch.mockImplementation(() => dispatch);
    useSelector.mockImplementation((selector) => selector({
      post: postState,
      user: userState,
    }));
  });

  it('renders LOGO and upload icon button', () => {
    render(<Header />);

    expect(screen.getByText('AnimalPhy')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'upload' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'plus' })).toBeInTheDocument();
  });

  it('renders Login Button', () => {
    render(<Header />);

    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });
});
