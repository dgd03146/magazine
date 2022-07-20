import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: {},
  like: 0
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {}
});
