import React from 'react';

import styled from '@emotion/styled';

const StyledImage = styled.img({
  width: 'auto',
  height: 'auto',

  cursor: 'pointer',
});

export default function Image({ src, postId, onClick }) {
  return (
    <StyledImage
      src={src}
      alt="post"
      onClick={() => onClick(postId)}
    />
  );
}
