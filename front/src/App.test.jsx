import React from 'react';

import { render, screen } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import {
  MemoryRouter,
} from 'react-router-dom';

import { useFormik } from 'formik';

import App from './App';

import { initialState as postState } from './data/postReducer';
import { initialState as userState } from './data/userReducer';

describe('App', () => {
  const dispatch = jest.fn();
  const handleChange = jest.fn();
  const handleSubmit = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();

    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      post: postState,
      user: userState,
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

  function renderApp({ path }) {
    return render((
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>
    ));
  }

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

  context('with path /signup', () => {
    it('renders the SignUpConainer', () => {
      renderApp({ path: '/signup' });

      expect(screen.getByRole('button', { name: '회원가입' })).toBeInTheDocument();
    });
  });

  context('with path /login', () => {
    it('renders the LoginConatiner', () => {
      renderApp({ path: '/login' });

      expect(screen.getByRole('button', { name: '로그인' })).toBeInTheDocument();
    });
  });

  context('with undefined path', () => {
    it('renders the main page', () => {
      renderApp({ path: '/' });

      expect(screen.getByText('loading...')).toBeInTheDocument();
    });
  });
});
