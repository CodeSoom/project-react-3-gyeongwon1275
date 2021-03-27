import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  formVisible: false,
  imageFile: null,
  text: '',
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
  },
});

export const {
  setFormVisible,
  setImageFile,
  setPostText,
} = actions;

export default reducer;
