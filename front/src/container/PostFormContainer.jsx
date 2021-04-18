import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import PostForm from '../components/PostForm';

import {
  setFormVisible, setImageFile, setPostReset,
  setPostText, writePost,
} from '../data/postReducer';

export default function PostFormContainer() {
  const dispatch = useDispatch();

  const { formVisible, imageFile: { readerResult }, text } = useSelector((state) => state.post);

  const onClose = () => {
    dispatch(setPostReset());
    dispatch(setFormVisible(false));
  };

  const onChangeImage = (file) => {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      dispatch(setImageFile({ readerResult: reader.result, name: file.name }));
    });

    reader.readAsDataURL(file);
  };

  const onChangeText = (postText) => {
    dispatch(setPostText(postText));
  };

  const onClick = () => {
    dispatch(writePost());
    onClose();
  };

  return (
    <PostForm
      onClose={onClose}
      onChangeImage={onChangeImage}
      onChangeText={onChangeText}
      onClick={onClick}
      text={text}
      image={readerResult}
      formVisible={formVisible}
    />
  );
}
