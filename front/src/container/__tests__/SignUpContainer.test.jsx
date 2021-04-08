import React from 'react';

import { render, screen, fireEvent } from '@testing-library/react';

import { useFormik } from 'formik';

import { useDispatch, useSelector } from 'react-redux';

import { MemoryRouter } from 'react-router-dom';

import given from 'given2';

import SignUpContainer from '../SignUpContainer';

const mockPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory() {
    return { push: mockPush };
  },
}));

describe('SignUpContainer', () => {
  const handleChange = jest.fn();
  const handleSubmit = jest.fn();
  const dispatch = jest.fn();

  function renderSignUpContainer() {
    return render((
      <MemoryRouter>
        <SignUpContainer />
      </MemoryRouter>
    ));
  }

  const initialValues = {
    userId: 'rud123',
    password: '',
    passwordConfirm: '',
    userName: '',
    email: '',
    phone: '',
  };

  beforeEach(() => {
    useFormik.mockImplementationOnce(() => ({
      values: initialValues,
      handleSubmit,
      handleChange,
    }));

    dispatch.mockClear();
    mockPush.mockClear();

    useDispatch.mockImplementationOnce(() => dispatch);
    useSelector.mockImplementationOnce((selector) => selector({
      user: {
        signUpSucceded: given.signUpSucceded,
      },
    }));
  });

  it('listens change,submit events', () => {
    renderSignUpContainer();

    const input = screen.getByLabelText('아이디');
    expect(input).toBeInTheDocument();
    expect(input.value).toBe('rud123');

    fireEvent.change(input, { target: { value: 'rud221' } });
    expect(handleChange).toHaveBeenCalled();

    const button = screen.getByRole('button', { name: '회원가입' });
    expect(button).toBeInTheDocument();

    fireEvent.submit(button);
    expect(handleSubmit).toHaveBeenCalled();
  });

  context('when signUpSucceded is true', () => {
    it('goes to login page ', () => {
      given('signUpSucceded', () => true);
      renderSignUpContainer();

      expect(mockPush).toHaveBeenCalledWith('/login');
    });
  });

  context('when signUpSucceded is false', () => {
    it("doesn't go to login page ", () => {
      given('signUpSucceded', () => false);
      renderSignUpContainer();

      expect(mockPush).not.toHaveBeenCalled();
    });
  });
});
