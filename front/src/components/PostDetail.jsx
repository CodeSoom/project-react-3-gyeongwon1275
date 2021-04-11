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

  width: '40vw',
  height: '50vh',
});

const StyledPost = styled(Card)({
  width: '100%',
});

const StyledImage = styled.img({

  padding: '0.5rem 0',

  width: '100%',
});

const CommentBox = styled.div({
  padding: '0 1.5rem',

  width: '100%',
  height: '25%',

  background: '#141414',
  border: '1px solid #303030',

  overflowY: 'auto',

});

export default function PostDetail({
  post, commentBoxOpen, onClickCommentIcon, comment, comments, onChange, onSubmit,
}) {
  const {
    content, created_at: createdTime, images, user,
  } = post;

  return (
    <PostWrapper>
      <StyledPost
        actions={[
          <LikeOutlined role="button" />,
          <DislikeOutlined role="button" />,
          <CommentOutlined role="button" onClick={onClickCommentIcon} />,
        ]}
      >

        <Comment
          avatar={
            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          }
          author={user.name}
          content={content}
          datetime={getTimeDifferenceToNow(createdTime)}
        />
        {images.map(({ url, id }) => (
          <li key={id}>
            <StyledImage src={url} alt="post-image" />
          </li>
        ))}
      </StyledPost>
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
