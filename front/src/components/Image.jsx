import React from 'react';

import styled from '@emotion/styled';

const PostImage = styled.img({
  width: '100vw',
  height: 'auto',

  margin: '10px 0',

  cursor: 'pointer',

  '@media (min-width: 768px)': {
    width: 'auto',
    height: '300px',

    margin: '5px',
  },
});

export default function Image({ src, postId, onClick }) {
  return (
    <PostImage
      src={src}
      alt="post"
      onClick={() => onClick(postId)}
    />
  );
}
