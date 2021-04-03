import { createSlice } from '@reduxjs/toolkit';

import {
  getImages,
  postImage,
  sendPost,
} from '../services/api';

import dataURLtoFile from '../utils';

export const initialState = {
  formVisible: false,
  imageFile: { readerResult: '', name: '' },
  text: '',
  error: '',
  posts: [],
  images: [],
};

const { actions, reducer } = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setFormVisible(state, { payload: formVisible }) {
      state.formVisible = formVisible;
    },
    setImageFile(state, { payload: { readerResult, name } }) {
      state.imageFile = { readerResult, name };
    },
    setPostText(state, { payload: text }) {
      state.text = text;
    },
    setPostReset(state) {
      state.text = '';
      state.imageFile = { readerResult: '', name: '' };
    },
    setError(state, { payload: error }) {
      state.error = error;
    },
    setImages(state, { payload: images }) {
      state.images = images;
    },
  },
});

export const {
  setFormVisible,
  setImageFile,
  setPostText,
  setPostReset,
  setError,
  setPosts,
  setImages,
} = actions;

export const loadImages = () => async (dispatch) => {
  try {
    const images = await getImages();
    dispatch(setImages(images));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const writePost = () => async (dispatch, getState) => {
  const { post } = getState();

  const { imageFile, text } = post;

  const { readerResult, name } = imageFile;

  if (!readerResult || !name || !text) {
    return;
  }

  const image = new FormData();

  const file = dataURLtoFile(readerResult, name);
  image.append('image', file);

  try {
    const { url } = await postImage(image);

    await sendPost({ text, url });

    dispatch(loadImages());
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export default reducer;
