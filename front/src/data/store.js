import { configureStore } from '@reduxjs/toolkit';

import post from './postReducer';
import user from './userReducer';

export default configureStore({
  reducer: {
    post,
    user,
  },
  devTools: process.env.NODE_ENV === 'development',
});
