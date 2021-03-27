import configureStore from 'redux-mock-store';
import { getDefaultMiddleware } from '@reduxjs/toolkit';

import postReducer,
{
  setError,
  setFormVisible, setImageFile, setPosts, setPostText, writePost,
} from '../postReducer';

import { getPosts, postImage, sendPost } from '../../services/api';

jest.mock('../../services/api');

const middlewares = getDefaultMiddleware();
const mockStore = configureStore(middlewares);

describe('postReducer', () => {
  describe('openPostForm', () => {
    it('changes setFormVisible', () => {
      const initialState = { formVisible: false };

      const state = postReducer(initialState, setFormVisible(true));

      expect(state.formVisible).toBe(true);
    });
  });

  describe('setImageFile', () => {
    it('changes imageFile', () => {
      const initialState = { imageFile: null };

      const imageFile = new FormData();
      imageFile.append('image', new Blob());

      const state = postReducer(initialState, setImageFile(imageFile));

      expect(state.imageFile).not.toBeNull();
    });
  });

  describe('setPostText', () => {
    it('changes text', () => {
      const initialState = { text: '' };

      const state = postReducer(initialState, setPostText('강아지'));

      expect(state.text).toBe('강아지');
    });
  });

  describe('setError', () => {
    it('changes error', () => {
      const initialState = { error: '' };

      const state = postReducer(initialState, setError('error'));

      expect(state.error).toBe('error');
    });
  });

  describe('writePost', () => {
    let store;

    context('when error not occuered', () => {
      beforeEach(() => {
        jest.clearAllMocks();

        postImage.mockImplementationOnce(() => Promise.resolve({ url: 'image-url' }));
        sendPost.mockImplementationOnce(() => Promise.resolve());
        getPosts.mockImplementationOnce(() => Promise.resolve([]));

        store = mockStore({
          post: {
            imageFile: 'mock-image',
            text: 'mock',
          },
        });
      });

      it('runs setPosts', async () => {
        await store.dispatch(writePost());

        const actions = store.getActions();

        expect(actions[0]).toEqual(setPosts());
      });
    });

    context('when error occuered', () => {
      beforeEach(() => {
        jest.clearAllMocks();

        postImage.mockImplementationOnce(() => Promise.resolve({ url: 'image-url' }));
        sendPost.mockImplementationOnce(() => Promise.resolve());
        const mockError = { message: 'error' };
        getPosts.mockImplementationOnce(() => Promise.reject(mockError));

        store = mockStore({
          post: {
            imageFile: 'mock-image',
            text: 'mock',
          },
        });
      });

      it('runs setError', async () => {
        await store.dispatch(writePost());

        const actions = store.getActions();

        expect(actions[0]).toEqual(setError('error'));
      });
    });
  });
});
