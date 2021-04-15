import React from 'react';

import { Button, Input } from 'antd';

import styled from '@emotion/styled';

import Logo from './Logo';

const SignUpFormBox = styled.form({
  marginTop: '20px',

  '@media (min-width: 768px)': {
    marginTop: '30px',
  },
});

const SignUpInput = styled(Input)({
  margin: '0.5rem 0 ',
  height: '45px',
});

const SignUpInputPassword = styled(Input.Password)({
  margin: '0.5rem 0 ',
  height: '45px',
});

const SignUpSubmitButton = styled(Button)({
  margin: '0.5rem 0 ',

  width: '100%',
  height: '45px',
});

const LoginLinkWrapper = styled.div({
  margin: '0.5rem 0 ',

  display: 'flex',
  justifyContent: 'center',

  width: '100%',
});

const LoginLink = styled.a({
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

function SignUpForm({ formValues, onChange, onSubmit }) {
  const {
    userId,
    password,
    passwordConfirm,
    userName,
    email,
    phone,
  } = formValues;

  return (
    <>
      <Logo />
      <SignUpFormBox
        onSubmit={onSubmit}
      >
        <Label htmlFor="userId">
          아이디
        </Label>
        <SignUpInput
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
        <SignUpInputPassword
          placeholder="비밀번호"
          id="password"
          name="password"
          type="password"
          size="large"
          onChange={onChange}
          value={password}
        />
        <Label htmlFor="passwordConfirm">
          비밀번호 확인
        </Label>
        <SignUpInputPassword
          placeholder="비밀번호 확인"
          id="passwordConfirm"
          name="passwordConfirm"
          type="password"
          size="large"
          onChange={onChange}
          value={passwordConfirm}
        />
        <Label htmlFor="userName">
          이름
        </Label>
        <SignUpInput
          placeholder="이름"
          id="userName"
          name="userName"
          type="text"
          size="large"
          onChange={onChange}
          value={userName}
        />
        <Label htmlFor="email">
          이메일
        </Label>
        <SignUpInput
          placeholder="이메일"
          id="email"
          name="email"
          type="text"
          size="large"
          onChange={onChange}
          value={email}
        />
        <Label htmlFor="phone">
          연락처
        </Label>
        <SignUpInput
          placeholder="연락처"
          id="phone"
          name="phone"
          type="text"
          size="large"
          onChange={onChange}
          value={phone}
        />
        <SignUpSubmitButton
          type="primary"
          htmlType="submit"
          size="large"
          onSubmit={onSubmit}
        >
          회원가입
        </SignUpSubmitButton>
      </SignUpFormBox>

      <LoginLinkWrapper>
        <p>이미 회원이세요?</p>
        <LoginLink href="/login">로그인</LoginLink>
      </LoginLinkWrapper>
    </>
  );
}

export default SignUpForm;
