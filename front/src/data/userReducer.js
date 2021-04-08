import { createSlice } from '@reduxjs/toolkit';

import { postSignUp } from '../services/api';

export const initialState = {
  signUpSucceded: false,
  error: '',
};

const { actions, reducer } = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setSignUpSucceded(state) {
      state.signUpSucceded = true;
    },
    setError(state, { payload: error }) {
      state.error = error;
    },
  },
});

export const {
  setError,
  setSignUpSucceded,
} = actions;

export const signUp = (formValues) => async (dispatch) => {
  try {
    await postSignUp(formValues);

    dispatch(setSignUpSucceded());
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export default reducer;
