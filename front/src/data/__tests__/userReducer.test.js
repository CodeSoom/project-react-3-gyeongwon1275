import configureStore from 'redux-mock-store';

import { getDefaultMiddleware } from '@reduxjs/toolkit';

import userReducer,
{
  setError,
  setSignUpSucceded,
  signUp,
} from '../userReducer';

import {
  postSignUp,
} from '../../services/api';

import { mockSignUpFormValues } from '../../feature/mockData';

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
          post: initialState,
        });
      });

      it('runs setError', async () => {
        await store.dispatch(signUp(mockSignUpFormValues));

        const actions = store.getActions();

        expect(actions[0]).toEqual(setError('error'));
      });
    });
  });
});
