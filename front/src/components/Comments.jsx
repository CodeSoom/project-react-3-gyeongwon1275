import React from 'react';

import {
  Avatar,
  Comment,
} from 'antd';

import { getTimeDifferenceToNow } from '../utils';

export default function Comments({ comments }) {
  if (comments.length < 1) {
    return <></>;
  }

  return (
    <>
      {comments.map(({
        id, content, created_at: createdTime, user, nonMember,
      }) => {
        const { name, profileUrl } = user || nonMember || { name: '', profileUrl: '' };

        return (
          <li key={id}>
            <Comment
              avatar={(
                <Avatar
                  src={profileUrl}
                  shape="square"
                  alt="comment-author-profile"
                />
              )}
              author={name}
              content={content}
              datetime={getTimeDifferenceToNow(createdTime)}
            />
          </li>
        );
      }) }
    </>
  );
}
