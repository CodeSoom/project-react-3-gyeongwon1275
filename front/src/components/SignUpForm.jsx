import React from 'react';

import { Button, Input } from 'antd';

import styled from '@emotion/styled';

import Logo from './Logo';

const StyledInput = styled(Input)({
  margin: '0.5rem 0 ',
  height: '45px',
});

const StyledInputPassword = styled(Input.Password)({
  margin: '0.5rem 0 ',
  height: '45px',
});

const StyledButton = styled(Button)({
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

const HiddenLabel = styled.label({
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
      <form
        onSubmit={onSubmit}
      >
        <HiddenLabel htmlFor="userId">
          아이디
        </HiddenLabel>
        <StyledInput
          placeholder="아이디"
          id="userId"
          name="userId"
          type="text"
          size="large"
          onChange={onChange}
          value={userId}
        />
        <HiddenLabel htmlFor="password">
          비밀번호
        </HiddenLabel>
        <StyledInputPassword
          placeholder="비밀번호"
          id="password"
          name="password"
          type="password"
          size="large"
          onChange={onChange}
          value={password}
        />
        <HiddenLabel htmlFor="passwordConfirm">
          비밀번호 확인
        </HiddenLabel>
        <StyledInputPassword
          placeholder="비밀번호 확인"
          id="passwordConfirm"
          name="passwordConfirm"
          type="password"
          size="large"
          onChange={onChange}
          value={passwordConfirm}
        />
        <HiddenLabel htmlFor="userName">
          이름
        </HiddenLabel>
        <StyledInput
          placeholder="이름"
          id="userName"
          name="userName"
          type="text"
          size="large"
          onChange={onChange}
          value={userName}
        />
        <HiddenLabel htmlFor="email">
          이메일
        </HiddenLabel>
        <StyledInput
          placeholder="이메일"
          id="email"
          name="email"
          type="text"
          size="large"
          onChange={onChange}
          value={email}
        />
        <HiddenLabel htmlFor="phone">
          연락처
        </HiddenLabel>
        <StyledInput
          placeholder="연락처"
          id="phone"
          name="phone"
          type="text"
          size="large"
          onChange={onChange}
          value={phone}
        />
        <StyledButton
          type="primary"
          htmlType="submit"
          size="large"
          onSubmit={onSubmit}
        >
          회원가입
        </StyledButton>
      </form>

      <LoginLinkWrapper>
        <p>이미 회원이세요?</p>
        <LoginLink href="/login">로그인</LoginLink>
      </LoginLinkWrapper>
    </>
  );
}

export default SignUpForm;
