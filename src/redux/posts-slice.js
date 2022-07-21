import { async } from '@firebase/util';
import { db } from '../shared/firebase';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, where, query } from 'firebase/firestore';

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || '';

export const getAllPosts = createAsyncThunk('posts/getAllPosts', async () => {
  let loadedPosts = [];
  const user_docs = await getDocs(query(collection(db, 'posts')));
  user_docs.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots

    loadedPosts.push(doc.data());
  });
  console.log(loadedPosts);
  const sortedPosts = loadedPosts.sort((a, b) => b.id - a.id);

  return sortedPosts;
});

export const getMyPosts = createAsyncThunk(
  'posts/getMyPosts',
  async (user_id) => {
    let loadedPosts = [];
    const user_docs = await getDocs(
      query(collection(db, 'posts'), where('user_id', '==', user_id))
    );
    user_docs.forEach((doc) => {
      let doc_id = doc.id;
      // doc.data() is never undefined for query doc snapshots
      const addDocId = { ...doc.data(), doc_id };

      loadedPosts.push(addDocId);
      console.log(loadedPosts, 'loadedPosts');
    });

    return loadedPosts;
  }
);

const initialState = {
  posts: [],
  myPosts: [],
  isEdit: false,
  status: '',
  doc_id: ''
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    add(state, action) {
      state.posts = [action.payload, ...state.posts];
    },
    edit(state, action) {
      state.posts = state.posts.map((it) => {
        if (parseInt(it.id) === parseInt(action.payload.id)) {
          return action.payload;
        } else {
          return it;
        }
      });
    },
    delete(state, action) {
      state.posts = state.posts.filter(
        (it) => parseInt(it.id) !== parseInt(action.payload)
      );
    },
    isEdit(state) {
      state.isEdit = true;
    },
    notIsEdit(state) {
      state.isEdit = false;
    }
  },
  extraReducers: {
    [getAllPosts.pending]: (state) => {
      state.status = 'loading';
    },
    [getAllPosts.fulfilled]: (state, action) => {
      state.posts = action.payload;
      state.status = 'success';
    },
    [getAllPosts.rejected]: (state, action) => {
      state.status = 'failed';
    },
    [getMyPosts.pending]: (state) => {
      state.status = 'loading';
    },
    [getMyPosts.fulfilled]: (state, action) => {
      state.myPosts = action.payload;

      state.status = 'success';
    },
    [getMyPosts.rejected]: (state, action) => {
      state.status = 'failed';
    }
  }
});

export const postsActions = postsSlice.actions;
export default postsSlice.reducer;
