import React from 'react';

import { useSelector } from 'react-redux';

import { useHistory } from 'react-router-dom';

import LoginButton from '../components/LoginButton';

export default function LoginButtonContainer() {
  const { accessToken } = useSelector((state) => state.user);

  const history = useHistory();

  const handleClick = () => {
    history.push('/login');
  };

  if (!accessToken) {
    return <LoginButton onClick={handleClick} />;
  }

  return <></>;
}
