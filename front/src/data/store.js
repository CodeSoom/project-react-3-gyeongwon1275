import { configureStore } from '@reduxjs/toolkit';

import post from './postReducer';

export default configureStore({
  reducer: {
    post,
  },
  devTools: process.env.NODE_ENV === 'development',
});
