import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import PostForm from '../components/PostForm';

import { setFormVisible, setImageFile, setPostText } from '../data/postReducer';

export default function PostFormContainer() {
  const dispatch = useDispatch();

  const { formVisible, imageFile } = useSelector((state) => state.post);

  const onClose = () => {
    dispatch(setFormVisible(false));
  };

  const onChangeImage = (file) => {
    const reader = new FileReader();

    reader.onload = () => {
      dispatch(setImageFile(reader.result));
    };

    reader.readAsDataURL(file);
  };

  const onChangeText = (text) => {
    dispatch(setPostText(text));
  };

  return (
    <PostForm
      onClose={onClose}
      onChangeImage={onChangeImage}
      onChangeText={onChangeText}
      imageFile={imageFile}
      formVisible={formVisible}
    />
  );
}
