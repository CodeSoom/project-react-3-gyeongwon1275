import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import PostDetail from '../components/PostDetail';

import {
  loadPost,
  setComment,
  setCommentBoxOpen,
  writeComment,
  loadComments,
} from '../data/postReducer';

export default function PostDetailContainer({ postId }) {
  const dispatch = useDispatch();
  const {
    post, commentBoxOpen, comment, comments,
  } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(loadPost(postId));
  }, [dispatch]);

  const handleCommentSubmit = () => {
    dispatch(writeComment(postId));
  };

  const handleCommentChange = (commentText) => {
    dispatch(setComment(commentText));
  };

  const handleCommentBox = () => {
    dispatch(setCommentBoxOpen());
    dispatch(loadComments(postId));
  };

  if (!post) {
    return <div>loading...</div>;
  }

  return (
    <PostDetail
      post={post}
      commentBoxOpen={commentBoxOpen}
      onClickCommentIcon={handleCommentBox}
      comment={comment}
      comments={comments}
      onChange={handleCommentChange}
      onSubmit={handleCommentSubmit}
    />
  );
}
