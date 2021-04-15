import React from 'react';

import { Button, Input } from 'antd';

import styled from '@emotion/styled';

import Logo from './Logo';

const LoginFormBox = styled.form({
  marginTop: '20px',

  '@media (min-width: 768px)': {
    marginTop: '30px',
  },
});

const LoginInput = styled(Input)({
  margin: '0.5rem 0 ',
  height: '45px',
});

const LoginInputPassword = styled(Input.Password)({
  margin: '0.5rem 0 ',
  height: '45px',
});

const LoginSubmitButton = styled(Button)({
  margin: '0.5rem 0 ',

  width: '100%',
  height: '45px',
});

const SignUpLinkWrapper = styled.div({
  margin: '0.5rem 0 ',

  display: 'flex',
  justifyContent: 'center',

  width: '100%',
});

const SignUpLink = styled.a({
  marginLeft: '1rem',
  color: '#1890ff',
  fontWeight: 'bold',

  '&:hover': {
    color: 'white',
  },
});

const Label = styled.label({
  display: 'none',
});

export default function LoginForm({ formValues, onChange, onSubmit }) {
  const {
    userId,
    password,
  } = formValues;

  return (
    <>
      <Logo />
      <LoginFormBox
        onSubmit={onSubmit}
      >
        <Label htmlFor="userId">
          아이디
        </Label>
        <LoginInput
          placeholder="아이디"
          id="userId"
          name="userId"
          type="text"
          size="large"
          onChange={onChange}
          value={userId}
        />
        <Label htmlFor="password">
          비밀번호
        </Label>
        <LoginInputPassword
          placeholder="비밀번호"
          id="password"
          name="password"
          type="password"
          size="large"
          onChange={onChange}
          value={password}
        />
        <LoginSubmitButton
          type="primary"
          htmlType="submit"
          size="large"
          onSubmit={onSubmit}
        >
          로그인
        </LoginSubmitButton>
      </LoginFormBox>
      <SignUpLinkWrapper>
        <p>계정이 없나요?</p>
        <SignUpLink href="/signup">회원가입</SignUpLink>
      </SignUpLinkWrapper>
    </>
  );
}
