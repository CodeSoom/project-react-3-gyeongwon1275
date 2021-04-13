import React from 'react';

import styled from '@emotion/styled';
import Comments from './Comments';
import CommentForm from './CommentForm';

const CommentWrapper = styled.div({
  padding: '0 1.5rem',

  width: '100%',
  height: '15vh',

  background: '#141414',
  border: '1px solid #303030',

  overflowY: 'auto',

  '@media (min-width: 768px)': {
    height: '25vh',
  },
});

export default function CommentBox({
  commentBoxOpen, comment, comments, onChange, onSubmit,
}) {
  if (!commentBoxOpen) {
    return <></>;
  }

  return (
    <CommentWrapper>
      <Comments comments={comments} />
      <CommentForm
        commentBoxOpen={commentBoxOpen}
        comment={comment}
        onChange={onChange}
        onSubmit={onSubmit}
      />
    </CommentWrapper>
  );
}
