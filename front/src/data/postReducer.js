import { createSlice } from '@reduxjs/toolkit';

import {
  getImages,
  getPost,
  postImage,
  sendPost,
  sendComment,
  getComments,
} from '../services/api';

import { dataURLtoFile } from '../utils';

export const initialState = {
  formVisible: false,
  imageFile: { readerResult: '', name: '' },
  text: '',
  error: '',
  posts: [],
  post: null,
  images: [],
  commentBoxOpen: false,
  comment: '',
  comments: [],
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
    setImages(state, { payload: images }) {
      state.images = images;
    },
    setCommentBoxOpen(state) {
      state.commentBoxOpen = !state.commentBoxOpen;
    },
    setComment(state, { payload: comment }) {
      state.comment = comment;
    },
    setComments(state, { payload: comments }) {
      state.comments = comments;
    },
    setPost(state, { payload: post }) {
      state.post = post;
    },
    setPostDetailReset(state) {
      state.post = null;
      state.commentBoxOpen = false;
      state.comment = '';
      state.comments = [];
    },
    setError(state, { payload: error }) {
      state.error = error;
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
  setPost,
  setPostDetailReset,
  setImages,
  setCommentBoxOpen,
  setComment,
  setComments,
} = actions;

export const loadImages = () => async (dispatch) => {
  try {
    const images = await getImages();
    dispatch(setImages(images));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const loadPost = (postId) => async (dispatch) => {
  try {
    const post = await getPost(postId);
    dispatch(setPost(post));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const writePost = () => async (dispatch, getState) => {
  const { post, user } = getState();

  const { imageFile, text } = post;

  const { readerResult, name } = imageFile;

  if (!readerResult || !name || !text) {
    return;
  }

  const image = new FormData();

  const file = dataURLtoFile(readerResult, name);
  image.append('image', file);

  const userId = user.user ? user.user.id : null;

  try {
    const { url } = await postImage(image);

    await sendPost({ text, url, userId });

    dispatch(loadImages());
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const loadComments = (postId) => async (dispatch, getState) => {
  try {
    const { post } = getState();

    if (!post.commentBoxOpen) {
      return;
    }

    const comments = await getComments(postId);
    dispatch(setComments(comments));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const writeComment = (postId) => async (dispatch, getState) => {
  const { post } = getState();
  const { comment } = post;

  if (!comment) {
    return;
  }

  try {
    await sendComment({ postId, comment });
    await dispatch(loadComments(postId));
    dispatch(setComment(''));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export default reducer;
