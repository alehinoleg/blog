import { createSlice } from '@reduxjs/toolkit';

import { fetchRegistration } from './fetchRegistration';
import { fetchSignIn } from './fetchSignIn';
import { fetchEditProfile } from './fetchEditProfile';

const userActionsSlice = createSlice({
  name: 'userActionsSlice',
  initialState: {
    user: null,
    status: null,
    error: null,
  },
  reducers: {
    exitUser(state) {
      console.log(state);
      state.user = null;
    },
    bbb(state, action) {
      state.user = action.payload;
    }
  },
  extraReducers: {
    [fetchRegistration.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchRegistration.fulfilled]: (state, action) => {
      console.log(action.payload.user);
      state.user = action.payload.user;
      state.status = 'resolved';
    },
    [fetchRegistration.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
    [fetchSignIn.fulfilled]: (state, action) => {
      state.user = action.payload.user;
      state.status = 'resolved';
    },
    [fetchEditProfile.fulfilled]: (state, action) => {
      console.log(action.payload.user);
      state.user = action.payload.user;
      state.status = 'resolved';
    },
  }
});
  
export const {exitUser, bbb} = userActionsSlice.actions;
export default userActionsSlice.reducer;