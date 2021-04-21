import React from 'react';

import {
  Card,
  Avatar,
  Comment as PostCard,
} from 'antd';
import {
  LikeOutlined,
  DislikeOutlined,
  CommentOutlined,
} from '@ant-design/icons';

import styled from '@emotion/styled';

import { getTimeDifferenceToNow } from '../utils';

import CommentBox from './CommentBox';

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

export default function PostDetail({
  post,
  commentBoxOpen,
  user,
  nonMember,
  comment,
  comments,
  onClickCommentIcon,
  onChange,
  onSubmit,

}) {
  const {
    content, created_at: createdTime, images, user: postAuthor, nonMember: postNonMember,
  } = post;

  const { name, profileUrl: postProfileUrl } = postAuthor || postNonMember || { name: '', profileUrl: '' };

  const { profileUrl } = user || nonMember;

  return (
    <PostWrapper>
      <PostBox
        actions={[
          <LikeOutlined role="button" />,
          <DislikeOutlined role="button" />,
          <CommentOutlined role="button" onClick={onClickCommentIcon} />,
        ]}
      >
        <PostCard
          avatar={(
            <Avatar
              shape="square"
              src={postProfileUrl}
              alt="post-author-profile"
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
      <CommentBox
        commentBoxOpen={commentBoxOpen}
        comment={comment}
        comments={comments}
        profileUrl={profileUrl}
        onChange={onChange}
        onSubmit={onSubmit}
      />
    </PostWrapper>
  );
}
