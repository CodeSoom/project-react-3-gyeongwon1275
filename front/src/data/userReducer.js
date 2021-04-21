import { createSlice } from '@reduxjs/toolkit';

import {
  postSignUp,
  postLogin,
  getUser,
  getNonMember,
} from '../services/api';

export const initialState = {
  signUpSucceded: false,
  accessToken: '',
  user: null,
  nonMember: null,
  error: '',
};

const { actions, reducer } = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setSignUpSucceded(state) {
      state.signUpSucceded = true;
    },
    setAccessToken(state, { payload: accessToken }) {
      state.accessToken = accessToken;
    },
    setUser(state, { payload: user }) {
      state.user = user;
    },
    setNonMember(state, { payload: nonMember }) {
      state.nonMember = nonMember;
    },
    setError(state, { payload: error }) {
      state.error = error;
    },
  },
});

export const {
  setError,
  setSignUpSucceded,
  setAccessToken,
  setUser,
  setNonMember,
} = actions;

export const signUp = (formValues) => async (dispatch) => {
  try {
    await postSignUp(formValues);

    dispatch(setSignUpSucceded());
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const loadUser = (accessToken) => async (dispatch) => {
  try {
    const user = await getUser(accessToken);

    dispatch(setUser(user));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const loadNonMember = () => async (dispatch, getState) => {
  try {
    const { user } = getState();

    if (user.user) return;
    if (user.nonMember) return;

    const nonMember = await getNonMember();

    dispatch(setNonMember(nonMember));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const login = (formValues) => async (dispatch) => {
  try {
    const { accessToken } = await postLogin(formValues);

    dispatch(setAccessToken(accessToken));
    dispatch(setNonMember(null));
    await dispatch(loadUser(accessToken));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export default reducer;
