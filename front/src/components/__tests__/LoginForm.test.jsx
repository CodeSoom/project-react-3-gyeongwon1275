import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';

import LoginForm from '../LoginForm';

describe('LoginForm', () => {
  const onChange = jest.fn();
  const onSubmit = jest.fn();

  const values = {
    userId: 'rud123',
    password: '123',

  };

  it('renders login form, Logo and listens change,submit event', () => {
    render((
      <LoginForm
        formValues={values}
        onChange={onChange}
        onSubmit={onSubmit}
      />
    ));

    expect(screen.getByText('AnimalPhy')).toBeInTheDocument();

    const inputs = [
      { label: '아이디', originValue: values.userId, valueToChange: 'rud285' },
      { label: '비밀번호', originValue: values.password, valueToChange: '1234' },
    ];

    inputs.forEach(({ label, originValue, valueToChange }) => {
      const input = screen.getByLabelText(label);
      expect(input).toBeInTheDocument();
      expect(input.value).toBe(originValue);

      fireEvent.change(input, { target: { value: valueToChange } });
      expect(onChange).toHaveBeenCalled();
    });

    const button = screen.getByRole('button', { name: '로그인' });
    expect(button).toBeInTheDocument();

    fireEvent.submit(button);
    expect(onSubmit).toHaveBeenCalled();

    expect(screen.getByText('계정이 없나요?')).toBeInTheDocument();

    const link = screen.getByRole('link', { name: '회원가입' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/signup');
  });
});
