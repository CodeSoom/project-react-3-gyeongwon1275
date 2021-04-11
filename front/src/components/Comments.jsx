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
            avatar={
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            }
            author={user ? user.name : '아무개'}
            content={content}
            datetime={getTimeDifferenceToNow(createdTime)}
          />
        </li>
      ))}
    </>
  );
}
