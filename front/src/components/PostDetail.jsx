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

export default function PostDetail({ post }) {
  const { content, created_at: createdTime, images } = post;

  return (
    <PostWrapper>
      <StyledPost
        actions={[
          <LikeOutlined />,
          <DislikeOutlined />,
          <CommentOutlined />,
        ]}
      >
        <Comment
          avatar={
            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          }
          author="아무개"
          content={content}
          datetime={getTimeDifferenceToNow(createdTime)}
        />
        {images.map(({ url, id }) => (
          <li key={id}>
            <StyledImage src={url} alt="post-image" />
          </li>
        ))}
      </StyledPost>
    </PostWrapper>
  );
}
