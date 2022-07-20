import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth-slice';
import postsReducer from './posts-slice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer
  }
});

export default store;
