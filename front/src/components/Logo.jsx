import React from 'react';

import styled from '@emotion/styled';

import Paw from '../utils/paw.svg';

const PawIcon = styled(Paw)({
  width: '33px',
  height: 'auto',
});

const LogoBox = styled.div({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
});

const LogoTitle = styled.span({
  marginLeft: '5px',

  fontSize: '1.5rem',
  fontWeight: 'bold',
});

export default function Logo() {
  return (
    <LogoBox>
      <PawIcon />
      <LogoTitle>AnimalPhy</LogoTitle>
    </LogoBox>
  );
}
