import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import PostForm from '../components/PostForm';

import { setFormVisible } from '../data/postReducer';

export default function PostFormContainer() {
  const dispatch = useDispatch();

  const formVisible = useSelector((state) => state.post.formVisible);

  const onClose = () => {
    dispatch(setFormVisible(false));
  };

  return (
    <PostForm
      onClose={onClose}
      formVisible={formVisible}
    />
  );
}
