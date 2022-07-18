import { createSlice } from '@reduxjs/toolkit';

const initialAuthState = { isLoggedIn: false, user: {} };

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logOut(state) {
      state.isLoggedIn = false;
    }
  }
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
