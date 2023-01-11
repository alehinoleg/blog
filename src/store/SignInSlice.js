import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const fetchSignIn = createAsyncThunk(
  'registration/fetchRegistration',
  async function(userData, {rejectWithValue}) {
    console.log(JSON.stringify(userData));
    try{
      const response = await fetch('https://blog.kata.academy/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        throw new Error('Регистрация не удачна');
      }
      const data = await response.json();
      console.log(data);
      return data;
    } catch(error) {
      return rejectWithValue(error.message);
    }
  }
);

const SignInSlice = createSlice({
  name: 'SignIn',
  initialState: {
    user: {},
    status: null,
    error: null,
  },
  reducers: {
    deleteUserSignIn(state) {
      console.log(state);
      state.user = {};
    }
  },
  extraReducers: {
    [fetchSignIn.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchSignIn.fulfilled]: (state, action) => {
      console.log(action.payload.user);
      state.user = action.payload.user;
      state.status = 'resolved';
    },
    [fetchSignIn.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
  }
});

export const {deleteUserSignIn} = SignInSlice.actions;
export default SignInSlice.reducer;