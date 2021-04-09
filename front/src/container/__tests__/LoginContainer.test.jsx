import React from 'react';

import { render, screen, fireEvent } from '@testing-library/react';

import { useFormik } from 'formik';

import { useDispatch, useSelector } from 'react-redux';

import { MemoryRouter } from 'react-router-dom';

import given from 'given2';

import LoginContainer from '../LoginContainer';

const mockPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory() {
    return { push: mockPush };
  },
}));

describe('LoginContainer', () => {
  const handleChange = jest.fn();
  const handleSubmit = jest.fn();
  const dispatch = jest.fn();

  function renderLoginConatiner() {
    return render((
      <MemoryRouter>
        <LoginContainer />
      </MemoryRouter>
    ));
  }

  const initialValues = {
    userId: 'rud123',
    password: '',
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
        accessToken: given.accessToken,
      },
    }));
  });

  it('listens change,submit events', () => {
    renderLoginConatiner();

    const input = screen.getByLabelText('아이디');
    expect(input).toBeInTheDocument();
    expect(input.value).toBe('rud123');

    fireEvent.change(input, { target: { value: 'rud221' } });
    expect(handleChange).toHaveBeenCalled();

    const button = screen.getByRole('button', { name: '로그인' });
    expect(button).toBeInTheDocument();

    fireEvent.submit(button);
    expect(handleSubmit).toHaveBeenCalled();
  });

  context('with accessToken', () => {
    it('goes to main page ', () => {
      given('accessToken', () => '1234');
      renderLoginConatiner();

      expect(mockPush).toHaveBeenCalledWith('/');
    });
  });

  context('without accessToken', () => {
    it("doesn't go to login page ", () => {
      given('accessToken', () => '');
      renderLoginConatiner();

      expect(mockPush).not.toHaveBeenCalled();
    });
  });
});
