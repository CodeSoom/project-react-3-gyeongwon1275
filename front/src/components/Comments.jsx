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
        id, content, created_at: createdTime, user,
      }) => (
        <li key={id}>
          <Comment
            avatar={(
              <Avatar
                src={user ? user.profileUrl : ''}
                shape="square"
                alt="comment-author-profile"
              />
            )}
            author={user ? user.name : '아무개'}
            content={content}
            datetime={getTimeDifferenceToNow(createdTime)}
          />
        </li>
      ))}
    </>
  );
}
