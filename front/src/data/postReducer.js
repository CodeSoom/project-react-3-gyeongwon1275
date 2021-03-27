import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  formVisible: false,
  imageFile: null,
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
  },
});

export const {
  setFormVisible,
  setImageFile,
} = actions;

export default reducer;
