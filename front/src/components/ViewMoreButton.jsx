import React from 'react';

import styled from '@emotion/styled';

import { Button } from 'antd';

const ButtonWrapper = styled.div({

  display: 'flex',
  justifyContent: 'center',

  width: '100%',
});

export default function ViewMoreButton({ viewMoreButtonVisible, onClick }) {
  if (!viewMoreButtonVisible) return <></>;

  return (
    <ButtonWrapper>
      <Button type="primary" onClick={onClick}>더보기</Button>
    </ButtonWrapper>
  );
}
