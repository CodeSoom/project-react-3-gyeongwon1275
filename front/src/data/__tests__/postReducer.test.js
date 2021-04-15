import configureStore from 'redux-mock-store';

import { getDefaultMiddleware } from '@reduxjs/toolkit';

import postReducer,
{
  setError,
  setFormVisible,
  setImageFile,
  setPostText,
  writePost,
  setPostReset,
  loadImages,
  loadImagesMore,
  setImages,
  addImages,
  setPost,
  loadPost,
  setCommentBoxOpen,
  setComment,
  setComments,
  writeComment,
  loadComments,
  setPostDetailReset,
  setViewMoreButtonVisible,
} from '../postReducer';

import {
  getImages,
  getPost,
  postImage,
  sendPost,
  sendComment,
  getComments,
} from '../../services/api';

import { dataURLtoFile } from '../../utils/index';
import {
  mockComment, mockImages, mockPost, mockUser,
} from '../../feature/mockData';

jest.mock('../../services/api');
jest.mock('../../utils');

const middlewares = getDefaultMiddleware();
const mockStore = configureStore(middlewares);

describe('postReducer', () => {
  let store;

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

      const readerResult = 'data:image/gif,abcd';
      const name = 'dog.gif';

      const { imageFile } = postReducer(initialState, setImageFile({ readerResult, name }));

      expect(imageFile.readerResult).toBe(readerResult);
      expect(imageFile.name).toBe(name);
    });
  });

  describe('setPostText', () => {
    it('changes text', () => {
      const initialState = { text: '' };

      const state = postReducer(initialState, setPostText('강아지'));

      expect(state.text).toBe('강아지');
    });
  });

  describe('setPostReset', () => {
    it('resets text, imageFile', () => {
      const initialState = {
        imageFile: { readerResult: 'data:image/gif,abcd', name: 'dog.gif' },
        text: 'this is a dog',
      };

      const { text, imageFile } = postReducer(initialState, setPostReset());

      expect(text).toBe('');
      expect(imageFile.readerResult).toBe('');
      expect(imageFile.name).toBe('');
    });
  });

  describe('setPostDetailReset', () => {
    it('resets post, commentBoxOpen, comment, comments', () => {
      const initialState = {
        post: mockPost,
        commentBoxOpen: true,
        comment: '댓글!',
        comments: [mockComment],
      };

      const {
        post, commentBoxOpen, comment, comments,
      } = postReducer(initialState, setPostDetailReset());

      expect(post).toBeNull();
      expect(commentBoxOpen).toBe(false);
      expect(comment).toBe('');
      expect(comments).toEqual([]);
    });

    describe('setPost', () => {
      it('changes post', () => {
        const initialState = {
          post: null,
        };

        const { post } = postReducer(initialState, setPost(mockPost));

        const {
          id, content, created_at: createdAt, userId, images, user,
        } = post;

        expect(id).toBe(mockPost.id);
        expect(content).toBe(mockPost.content);
        expect(createdAt).toBe(mockPost.created_at);
        expect(userId).toBe(mockPost.userId);
        expect(images).toEqual(mockPost.images);
        expect(user).toEqual(mockPost.user);
      });
    });

    describe('setCommentBoxOpen', () => {
      it('changes commentBoxOpen', () => {
        const initialState = { commentBoxOpen: false };

        const state = postReducer(initialState, setCommentBoxOpen());

        expect(state.commentBoxOpen).toBe(true);
      });
    });

    describe('setComment', () => {
      it('changes comment', () => {
        const initialState = { comment: '' };

        const state = postReducer(initialState, setComment('댓글'));

        expect(state.comment).toBe('댓글');
      });
    });

    describe('setComments', () => {
      it('changes comments', () => {
        const initialState = { comments: [] };

        const state = postReducer(initialState, setComments([mockComment]));

        expect(state.comments[0]).toMatchObject(mockComment);
      });
    });

    describe('setViewMoreButtonVisible', () => {
      it('changes viewMoreButtonVisible', () => {
        const initialState = { viewMoreButtonVisible: true };

        const state = postReducer(initialState, setViewMoreButtonVisible(false));

        expect(state.viewMoreButtonVisible).toBe(false);
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
      const initialState = {
        formVisible: false,
        imageFile: { readerResult: 'image/gif;base64,R0lGODlhYwETAfZ/ABQJCohWK', name: 'dog' },
        text: '개입니다',
        error: '',
        posts: [],
        images: [],
      };

      context('when error not occurred', () => {
        beforeEach(() => {
          jest.clearAllMocks();

          dataURLtoFile.mockImplementationOnce(() => 'imageFile');
          postImage.mockImplementationOnce(() => Promise.resolve({ url: 'image-url' }));
          sendPost.mockImplementationOnce(() => Promise.resolve());
          getImages.mockImplementationOnce(() => Promise.resolve([]));

          store = mockStore({
            post: initialState,
            user: {
              user: null,
            },
          });
        });

        it('runs setImages', async () => {
          await store.dispatch(writePost());

          const actions = store.getActions();
          expect(actions[0]).toEqual(setImages([]));
        });
      });

      context('with user', () => {
        beforeEach(() => {
          jest.clearAllMocks();

          dataURLtoFile.mockImplementationOnce(() => 'imageFile');
          postImage.mockImplementationOnce(() => Promise.resolve({ url: 'image-url' }));
          sendPost.mockImplementationOnce(() => Promise.resolve());
          getImages.mockImplementationOnce(() => Promise.resolve([]));

          store = mockStore({
            post: initialState,
            user: {
              user: mockUser,
            },
          });
        });

        it('calls sendPost with text,url,userId', async () => {
          await store.dispatch(writePost());

          expect(sendPost).toHaveBeenCalledWith({ text: '개입니다', url: 'image-url', userId: 3 });
        });
      });

      context('without user', () => {
        beforeEach(() => {
          jest.clearAllMocks();

          dataURLtoFile.mockImplementationOnce(() => 'imageFile');
          postImage.mockImplementationOnce(() => Promise.resolve({ url: 'image-url' }));
          sendPost.mockImplementationOnce(() => Promise.resolve());
          getImages.mockImplementationOnce(() => Promise.resolve([]));

          store = mockStore({
            post: initialState,
            user: {
              user: null,
            },
          });
        });

        it('calls sendPost with text,url,(userId=null)', async () => {
          await store.dispatch(writePost());

          expect(sendPost).toHaveBeenCalledWith({ text: '개입니다', url: 'image-url', userId: null });
        });
      });

      context('when error occurred', () => {
        beforeEach(() => {
          jest.clearAllMocks();
          postImage.mockImplementationOnce(() => Promise.resolve({ url: 'image-url' }));
          sendPost.mockImplementationOnce(() => Promise.resolve());

          const mockError = { message: 'error' };
          getImages.mockImplementationOnce(() => Promise.reject(mockError));

          store = mockStore({
            post: initialState,
            user: {
              user: mockUser,
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

    describe('loadImages', () => {
      context('when error not occurred', () => {
        beforeEach(() => {
          jest.clearAllMocks();

          getImages.mockImplementationOnce(() => Promise.resolve([]));

          store = mockStore({
            post: {
              images: [],
            },
          });
        });

        it('runs setImages', async () => {
          await store.dispatch(loadImages());
          const actions = store.getActions();

          expect(actions[0]).toEqual(setImages([]));
        });
      });

      context('when error occurred', () => {
        beforeEach(() => {
          jest.clearAllMocks();

          const mockError = { message: 'error' };
          getImages.mockImplementationOnce(() => Promise.reject(mockError));

          store = mockStore({
            post: {
              images: [],
            },
          });
        });

        it('runs setError', async () => {
          await store.dispatch(loadImages());

          const actions = store.getActions();

          expect(actions[0]).toEqual(setError('error'));
        });
      });
    });

    describe('loadImagesMore', () => {
      context('when error not occurred', () => {
        beforeEach(() => {
          jest.clearAllMocks();

          getImages.mockImplementationOnce(() => Promise.resolve(mockImages));

          store = mockStore({
            post: {
              images: [],
            },
          });
        });

        it('runs addImages', async () => {
          await store.dispatch(loadImagesMore());
          const actions = store.getActions();

          expect(actions[0]).toEqual(addImages(mockImages));
        });

        it('calls getImages with lastId', async () => {
          await store.dispatch(loadImagesMore(5));

          expect(getImages).toHaveBeenCalledWith(5);
        });
      });

      context('when error occurred', () => {
        beforeEach(() => {
          jest.clearAllMocks();

          const mockError = { message: 'error' };
          getImages.mockImplementationOnce(() => Promise.reject(mockError));

          store = mockStore({
            post: {
              images: [],
            },
          });
        });

        it('runs setError', async () => {
          await store.dispatch(loadImagesMore());

          const actions = store.getActions();

          expect(actions[0]).toEqual(setError('error'));
        });
      });
    });

    describe('loadPost', () => {
      context('when error not occurred', () => {
        beforeEach(() => {
          jest.clearAllMocks();

          getPost.mockImplementationOnce(() => Promise.resolve([]));

          store = mockStore({
            post: {
              post: null,
            },
          });
        });

        it('runs setPost', async () => {
          await store.dispatch(loadPost(1));
          const actions = store.getActions();

          expect(actions[0]).toEqual(setPost([]));
        });
      });

      context('when error occurred', () => {
        beforeEach(() => {
          jest.clearAllMocks();

          const mockError = { message: 'error' };
          getPost.mockImplementationOnce(() => Promise.reject(mockError));

          store = mockStore({
            post: {
              post: null,
            },
          });
        });

        it('runs setError', async () => {
          await store.dispatch(loadPost(1));

          const actions = store.getActions();

          expect(actions[0]).toEqual(setError('error'));
        });
      });
    });

    describe('loadComments', () => {
      context('when commentBox not opened', () => {
        beforeEach(() => {
          jest.clearAllMocks();
          getComments.mockImplementation(() => Promise.resolve([]));

          store = mockStore({
            post: {
              comments: [],
              commentBoxOpen: false,
            },
          });
        });

        it("doesn't run ", async () => {
          await store.dispatch(loadComments(1));
          const actions = store.getActions();

          expect(actions).toEqual([]);
        });
      });

      context('when error not occurred', () => {
        beforeEach(() => {
          jest.clearAllMocks();
          getComments.mockImplementation(() => Promise.resolve([]));

          store = mockStore({
            post: {
              comments: [],
              commentBoxOpen: true,
            },
          });
        });

        it('runs setComments', async () => {
          await store.dispatch(loadComments(1));
          const actions = store.getActions();

          expect(actions[0]).toEqual(setComments([]));
        });
      });

      context('when error occurred', () => {
        beforeEach(() => {
          jest.clearAllMocks();
          const mockError = { message: 'error' };
          getComments.mockImplementation(() => Promise.reject(mockError));

          store = mockStore({
            post: {
              comments: [],
              commentBoxOpen: true,
            },
          });
        });

        it('runs setError', async () => {
          await store.dispatch(loadComments(1));

          const actions = store.getActions();

          expect(actions[0]).toEqual(setError('error'));
        });
      });
    });

    describe('writeComment', () => {
      context('when error not occurred', () => {
        beforeEach(() => {
          jest.clearAllMocks();

          sendComment.mockImplementationOnce(() => Promise.resolve());
          getComments.mockImplementation(() => Promise.resolve([]));
          store = mockStore({
            post: {
              post: null,
              comment: '댓글!',
              commentBoxOpen: true,
            },
            user: {
              user: null,
            },
          });
        });

        it('runs setComments, setComment', async () => {
          await store.dispatch(writeComment(1));
          const actions = store.getActions();

          expect(actions[0]).toEqual(setComments([]));
          expect(actions[1]).toEqual(setComment(''));
        });
      });

      context('with user ', () => {
        beforeEach(() => {
          jest.clearAllMocks();

          sendComment.mockImplementationOnce(() => Promise.resolve());
          getComments.mockImplementation(() => Promise.resolve([]));
          store = mockStore({
            post: {
              post: null,
              comment: '댓글!',
              commentBoxOpen: true,
            },
            user: {
              user: mockUser,
            },
          });
        });

        it('calls sendComment with postId,comment,userId', async () => {
          await store.dispatch(writeComment(1));

          expect(sendComment).toHaveBeenCalledWith({ comment: '댓글!', postId: 1, userId: 3 });
        });
      });

      context('without user ', () => {
        beforeEach(() => {
          jest.clearAllMocks();

          sendComment.mockImplementationOnce(() => Promise.resolve());
          getComments.mockImplementation(() => Promise.resolve([]));
          store = mockStore({
            post: {
              post: null,
              comment: '댓글!',
              commentBoxOpen: true,
            },
            user: {
              user: null,
            },
          });
        });

        it('calls sendComment with postId,comment,(userId = null)', async () => {
          await store.dispatch(writeComment(1));

          expect(sendComment).toHaveBeenCalledWith({ comment: '댓글!', postId: 1, userId: null });
        });
      });

      context('when error occurred', () => {
        beforeEach(() => {
          jest.clearAllMocks();

          const mockError = { message: 'error' };
          sendComment.mockRejectedValue((mockError));
          getComments.mockRejectedValue(mockError);

          store = mockStore({
            post: {
              post: null,
              comment: '댓글!',
            },
            user: {
              user: null,
            },
          });
        });

        it('runs setError', async () => {
          await store.dispatch(writeComment(1));

          const actions = store.getActions();

          expect(actions[0]).toEqual(setError('error'));
        });
      });
    });
  });
});
