import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { render, screen } from '@testing-library/react';

import { useFormik } from 'formik';

import { initialState } from '../../data/userReducer';

import PublicLayout from '../PublicLayout';
import SignUpContainer from '../../container/SignUpContainer';

describe('PublicLayout', () => {
  const handleChange = jest.fn();
  const handleSubmit = jest.fn();
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      user: initialState,
    }));

    useFormik.mockImplementationOnce(() => ({
      values: {
        userId: 'rud123',
        password: '',
        passwordConfirm: '',
        userName: '',
        email: '',
        phone: '',
      },
      handleSubmit,
      handleChange,
    }));
  });

  it('renders component received as prop', () => {
    render(<PublicLayout component={SignUpContainer} />);

    expect(screen.getByText('회원가입')).toBeInTheDocument();
  });
});
