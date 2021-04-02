import React from 'react';

import styled from '@emotion/styled';

const StyledImage = styled.img({
  width: 'auto',
  height: 'auto',
});

export default function Post({ src }) {
  return (
    <StyledImage src={src} alt="post" />
  );
}
