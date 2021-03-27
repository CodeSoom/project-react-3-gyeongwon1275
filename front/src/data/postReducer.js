import { createSlice } from '@reduxjs/toolkit';

import { getPosts, postImage, sendPost } from '../services/api';

const initialState = {
  formVisible: false,
  imageFile: null,
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
    setImageFile(state, { payload: imageFile }) {
      state.imageFile = imageFile;
    },
    setPostText(state, { payload: text }) {
      state.text = text;
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
  setError,
  setPosts,
} = actions;

export const writePost = () => async (dispatch, getState) => {
  const { post } = getState();

  const { imageFile, text } = post;

  if (!imageFile || !text) {
    return;
  }

  const image = new FormData();
  image.append('image', imageFile);

  try {
    const { url } = await postImage(image);

    await sendPost({ text, url });

    const { posts } = await getPosts();

    dispatch(setPosts(posts));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export default reducer;
