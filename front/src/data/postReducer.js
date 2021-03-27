import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  formVisible: false,
};

const { actions, reducer } = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setFormVisible(state, { payload: formVisible }) {
      state.formVisible = formVisible;
    },
  },

});

export const {
  setFormVisible,
} = actions;

export default reducer;
