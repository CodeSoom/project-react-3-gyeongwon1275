import { configureStore } from '@reduxjs/toolkit';

import post from './postReducer';

const store = configureStore({
  reducer: {
    post,
  },
});

export default store;
