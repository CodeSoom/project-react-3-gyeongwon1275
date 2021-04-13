import React from 'react';

import {
  Card,
  Avatar,
  Comment,
} from 'antd';
import {
  LikeOutlined,
  DislikeOutlined,
  CommentOutlined,
} from '@ant-design/icons';

import styled from '@emotion/styled';

import { getTimeDifferenceToNow } from '../utils';

import CommentForm from './CommentForm';
import Comments from './Comments';

const PostWrapper = styled.div({
  margin: '1rem auto',

  width: '100vw',
  height: 'auto',

  overflow: 'visible',

  '@media (min-width: 768px)': {
    width: '33vw',
    height: 'auto',
  },
});

const PostBox = styled(Card)({
  width: '100%',
});

const PostDetailImage = styled.img({

  padding: '0.5rem 0',

  width: '100%',
});

const CommentBox = styled.div({
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

export default function PostDetail({
  post, commentBoxOpen, onClickCommentIcon, comment, comments, onChange, onSubmit,
}) {
  const {
    content, created_at: createdTime, images, user,
  } = post;

  const { name, profileUrl } = user || { name: '아무개', profileUrl: '' };

  return (
    <PostWrapper>
      <PostBox
        actions={[
          <LikeOutlined role="button" />,
          <DislikeOutlined role="button" />,
          <CommentOutlined role="button" onClick={onClickCommentIcon} />,
        ]}
      >
        <Comment
          avatar={(
            <Avatar
              shape="square"
              src={profileUrl}
            />
          )}
          author={name}
          content={content}
          datetime={getTimeDifferenceToNow(createdTime)}
        />
        {images.map(({ url, id }) => (
          <li key={id}>
            <PostDetailImage src={url} alt="post-image" />
          </li>
        ))}
      </PostBox>
      <CommentBox>
        <Comments comments={comments} />
        <CommentForm
          commentBoxOpen={commentBoxOpen}
          comment={comment}
          onChange={onChange}
          onSubmit={onSubmit}
        />
      </CommentBox>
    </PostWrapper>
  );
}
