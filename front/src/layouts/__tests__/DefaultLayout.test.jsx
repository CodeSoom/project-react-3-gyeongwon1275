import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { render, screen } from '@testing-library/react';

import { initialState as postState } from '../../data/postReducer';
import { initialState as userState } from '../../data/userReducer';

import Header from '../../components/Header';
import DefaultLayout from '../DefaultLayout';
import Main from '../../pages/Main';

describe('DefaultLayout', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
    useDispatch.mockImplementation(() => dispatch);
    useSelector.mockImplementation((selector) => selector({
      post: postState,
      user: userState,
    }));
  });

  it('renders Header', () => {
    render(<Header />);

    expect(screen.getByText('AnimalPhy')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'upload' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'plus' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

  it('renders component received as prop', () => {
    render(<DefaultLayout component={Main} />);

    expect(screen.getByText('loading...')).toBeInTheDocument();
  });
});
