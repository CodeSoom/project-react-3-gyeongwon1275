import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';

import SignUpForm from '../SignUpForm';

describe('SignUpForm', () => {
  const onChange = jest.fn();
  const onSubmit = jest.fn();

  const values = {
    userId: 'rud123',
    password: '123',
    passwordConfirm: '123',
    userName: '김붕어',
    email: 'rud123@naver.com',
    phone: '01012345678',
  };

  it('renders sign up form, Logo and listens change,submit event', () => {
    render((
      <SignUpForm
        formValues={values}
        onChange={onChange}
        onSubmit={onSubmit}
      />
    ));

    expect(screen.getByText('AnimalPhy')).toBeInTheDocument();

    const inputs = [
      { label: '아이디', originValue: values.userId, valueToChange: 'rud285' },
      { label: '비밀번호', originValue: values.password, valueToChange: '1234' },
      { label: '비밀번호 확인', originValue: values.passwordConfirm, valueToChange: '1234' },
      { label: '이름', originValue: values.userName, valueToChange: '김참치' },
      { label: '이메일', originValue: values.email, valueToChange: 'rud285@naver.com' },
      { label: '연락처', originValue: values.phone, valueToChange: '01086901275' },
    ];

    inputs.forEach(({ label, originValue, valueToChange }) => {
      const input = screen.getByLabelText(label);
      expect(input).toBeInTheDocument();
      expect(input.value).toBe(originValue);

      fireEvent.change(input, { target: { value: valueToChange } });
      expect(onChange).toHaveBeenCalled();
    });

    const button = screen.getByRole('button', { name: '회원가입' });
    expect(button).toBeInTheDocument();

    fireEvent.submit(button);
    expect(onSubmit).toHaveBeenCalled();

    expect(screen.getByText('이미 회원이세요?')).toBeInTheDocument();

    const link = screen.getByRole('link', { name: '로그인' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/login');
  });
});
