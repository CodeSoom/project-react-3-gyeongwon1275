import React from 'react';

import { Button, Input } from 'antd';

import styled from '@emotion/styled';

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

const StyledLinkWrapper = styled.div({
  margin: '0.5rem 0 ',

  display: 'flex',
  justifyContent: 'center',

  width: '100%',
});

const StyledLink = styled.a({
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

export default function LoginForm({ formValues, onChange, onSubmit }) {
  const {
    userId,
    password,
  } = formValues;

  return (
    <>
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
        <StyledButton
          type="primary"
          htmlType="submit"
          size="large"
          onSubmit={onSubmit}
        >
          로그인
        </StyledButton>
      </form>
      <StyledLinkWrapper>
        <p>계정이 없나요?</p>
        <StyledLink href="/signup">회원가입</StyledLink>
      </StyledLinkWrapper>
    </>
  );
}
