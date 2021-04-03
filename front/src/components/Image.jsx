import React from 'react';

import styled from '@emotion/styled';

const StyledImage = styled.img({
  width: 'auto',
  height: 'auto',
});

export default function Image({ src, postId }) {
  return (
    <StyledImage src={src} alt="post" />
  );
}
