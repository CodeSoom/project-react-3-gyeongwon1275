import { createSlice } from '@reduxjs/toolkit';

import { getPosts, postImage, sendPost } from '../services/api';

import dataURLtoFile from '../utils';

export const initialState = {
  formVisible: false,
  imageFile: { readerResult: '', name: '' },
  text: '',
  error: '',
  posts: [],
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
    setPosts(state, { payload: posts }) {
      state.posts = posts;
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
} = actions;

export const loadPosts = () => async (dispatch) => {
  try {
    const posts = await getPosts();
    dispatch(setPosts(posts));
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

    dispatch(loadPosts());
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export default reducer;
