import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import PostDetail from '../components/PostDetail';

import {
  loadPost,
  setComment,
  setCommentBoxOpen,
  writeComment,
  loadComments,
  setPostDetailReset,
} from '../data/postReducer';

export default function PostDetailContainer({ postId }) {
  const dispatch = useDispatch();

  const {
    post, commentBoxOpen, comment, comments,
  } = useSelector((state) => state.post);

  const { user, nonMember } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(loadPost(postId));
    return () => {
      dispatch(setPostDetailReset());
    };
  }, [dispatch, postId]);

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
      user={user}
      nonMember={nonMember}
      comment={comment}
      comments={comments}
      onClickCommentIcon={handleCommentBox}
      onChange={handleCommentChange}
      onSubmit={handleCommentSubmit}
    />
  );
}
