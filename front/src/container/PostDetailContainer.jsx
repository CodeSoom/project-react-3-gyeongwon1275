import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import PostDetail from '../components/PostDetail';

import { loadPost } from '../data/postReducer';

export default function PostDetailContainer({ postId }) {
  const dispatch = useDispatch();
  const { post } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(loadPost(postId));
  }, [dispatch]);

  if (!post) {
    return <div>loading...</div>;
  }

  return (
    <PostDetail post={post} />
  );
}
