import configureStore from 'redux-mock-store';

import { getDefaultMiddleware } from '@reduxjs/toolkit';

import userReducer,
{
  login,
  setAccessToken,
  setUser,
  setError,
  setSignUpSucceded,
  signUp,
  loadUser,
  loadNonMember,
  setNonMember,
} from '../userReducer';

import {
  getNonMember,
  getUser,
  postLogin,
  postSignUp,
} from '../../services/api';

import {
  mockLoginFormValues, mockNonMember, mockSignUpFormValues, mockUser,
} from '../../feature/mockData';

jest.mock('../../services/api');

const middlewares = getDefaultMiddleware();
const mockStore = configureStore(middlewares);

describe('userReducer', () => {
  let store;

  describe('setSignUpSucced', () => {
    it('changes signUpSucceded', () => {
      const initialState = { signUpSucced: false };

      const state = userReducer(initialState, setSignUpSucceded());

      expect(state.signUpSucceded).toBe(true);
    });
  });

  describe('setAccessToken', () => {
    it('changes accessToken', () => {
      const initialState = { accessToken: '' };

      const state = userReducer(initialState, setAccessToken('1234'));

      expect(state.accessToken).toBe('1234');
    });
  });

  describe('setUser', () => {
    it('changes user', () => {
      const initialState = { user: null };

      const state = userReducer(initialState, setUser({}));

      expect(state.user).toEqual({});
    });
  });

  describe('setError', () => {
    it('changes error', () => {
      const initialState = { error: '' };

      const state = userReducer(initialState, setError('error'));

      expect(state.error).toBe('error');
    });
  });

  describe('signUp', () => {
    const initialState = {
      error: '',
    };

    context('when error not occurred', () => {
      beforeEach(() => {
        jest.clearAllMocks();

        postSignUp.mockImplementationOnce(() => Promise.resolve({ data: 'ok' }));

        store = mockStore({
          user: initialState,
        });
      });

      it('runs setSignUpSucced', async () => {
        await store.dispatch(signUp(mockSignUpFormValues));

        const actions = store.getActions();

        expect(actions[0]).toEqual(setSignUpSucceded());
      });
    });

    context('when error occurred', () => {
      beforeEach(() => {
        jest.clearAllMocks();

        const mockError = { message: 'error' };
        postSignUp.mockImplementationOnce(() => Promise.reject(mockError));

        store = mockStore({
          user: initialState,
        });
      });

      it('runs setError', async () => {
        await store.dispatch(signUp(mockSignUpFormValues));

        const actions = store.getActions();

        expect(actions[0]).toEqual(setError('error'));
      });
    });
  });

  describe('loadUser', () => {
    const initialState = {
      user: null,
    };

    context('when error not occurred', () => {
      beforeEach(() => {
        jest.clearAllMocks();
        getUser.mockImplementationOnce(() => Promise.resolve({}));

        store = mockStore({
          user: initialState,
        });
      });

      it('runs setUser', async () => {
        await store.dispatch(loadUser('1234'));

        const actions = store.getActions();

        expect(actions[0]).toEqual(setUser({}));
      });
    });

    context('when error occurred', () => {
      beforeEach(() => {
        jest.clearAllMocks();

        const mockError = { message: 'error' };
        getUser.mockImplementationOnce(() => Promise.reject(mockError));

        store = mockStore({
          user: {
            nonMember: initialState,
          },
        });
      });

      it('runs setError', async () => {
        await store.dispatch(loadUser('1234'));

        const actions = store.getActions();

        expect(actions[0]).toEqual(setError('error'));
      });
    });
  });

  describe('loadNonMember', () => {
    const initialState = {
      nonMember: null,
    };

    context('with user', () => {
      beforeEach(() => {
        getNonMember.mockClear();
        getNonMember.mockImplementation(() => Promise.resolve(mockNonMember));

        store = mockStore({
          user: {
            user: mockUser,
          },
        });
      });

      it('doesn`t run actions', async () => {
        await store.dispatch(loadNonMember());

        const actions = store.getActions();

        expect(actions).toHaveLength(0);
      });
    });

    context('with nonMember', () => {
      beforeEach(() => {
        getNonMember.mockClear();
        getNonMember.mockImplementation(() => Promise.resolve(mockNonMember));

        store = mockStore({
          user: {
            nonMember: mockNonMember,
          },
        });
      });

      it('doesn`t run actions', async () => {
        await store.dispatch(loadNonMember());

        const actions = store.getActions();

        expect(actions).toHaveLength(0);
      });
    });

    context('when error not occurred', () => {
      beforeEach(() => {
        getNonMember.mockClear();
        getNonMember.mockImplementation(() => Promise.resolve(mockNonMember));

        store = mockStore({
          user: initialState,
        });
      });

      it('runs setNonMember', async () => {
        await store.dispatch(loadNonMember());

        const actions = store.getActions();

        expect(actions[0]).toEqual(setNonMember(mockNonMember));
      });
    });

    context('when error occurred', () => {
      beforeEach(() => {
        getNonMember.mockClear();

        const mockError = { message: 'error' };
        getNonMember.mockImplementation(() => Promise.reject(mockError));

        store = mockStore({
          user: initialState,
        });
      });

      it('runs setError', async () => {
        await store.dispatch(loadNonMember());

        const actions = store.getActions();

        expect(actions[0]).toEqual(setError('error'));
      });
    });
  });

  describe('login', () => {
    const initialState = {
      accessToken: '',
      user: null,
      error: '',
    };

    context('when error not occurred', () => {
      beforeEach(() => {
        jest.clearAllMocks();
        postLogin.mockImplementationOnce(() => Promise.resolve({ accessToken: '1234' }));
        getUser.mockImplementationOnce(() => Promise.resolve({}));

        store = mockStore({
          user: initialState,
        });
      });

      it('runs setAccessToken, setNonMember,setUser', async () => {
        await store.dispatch(login(mockLoginFormValues));

        const actions = store.getActions();

        expect(actions[0]).toEqual(setAccessToken('1234'));
        expect(actions[1]).toEqual(setNonMember(null));
        expect(actions[2]).toEqual(setUser({}));
      });
    });

    context('when error occurred', () => {
      beforeEach(() => {
        jest.clearAllMocks();

        const mockError = { message: 'error' };
        postLogin.mockImplementationOnce(() => Promise.reject(mockError));

        store = mockStore({
          user: initialState,
        });
      });

      it('runs setError', async () => {
        await store.dispatch(login(mockLoginFormValues));

        const actions = store.getActions();

        expect(actions[0]).toEqual(setError('error'));
      });
    });
  });
});
