import React from 'react';

import styled from '@emotion/styled';

import { Avatar, Input } from 'antd';

const CommentDialogWrapper = styled.div({
  marginTop: '1rem',

  width: '100%',

  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',

});

const ProfileWrapper = styled.div({

  flex: '0 0 auto',
  marginRight: '0.5rem',
});

const CommentFormWrapper = styled.form({

  flex: '1 1 auto',
});

const CommentInputWrapper = styled.div({

  borderBottom: '1px #737373',
  width: '100%',
  height: 'auto',

  marginBottom: '0.5rem',
});

const CommentInputLabel = styled.label({
  display: 'hidden',
});

export default function CommentForm({
  commentBoxOpen, comment, onChange, onSubmit,
}) {
  if (!commentBoxOpen) {
    return <></>;
  }

  return (
    <CommentDialogWrapper>
      <ProfileWrapper>
        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
      </ProfileWrapper>
      <CommentFormWrapper
        role="form"
        onSubmit={
          (event) => {
            event.preventDefault();
            onSubmit();
          }
        }
      >
        <CommentInputWrapper>
          <CommentInputLabel htmlFor="comment-input">comment-input</CommentInputLabel>
          <Input
            size="large"
            bordered
            id="comment-input"
            placeholder="공개 댓글 추가..."
            value={comment}
            onChange={(event) => { onChange(event.target.value); }}
          />
          <div>글을 게시하려면 Enter 키를 누르세요.</div>
        </CommentInputWrapper>
      </CommentFormWrapper>
    </CommentDialogWrapper>
  );
}
