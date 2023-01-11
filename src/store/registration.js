import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchRegistration = createAsyncThunk(
  'registration/fetchRegistration',
  async function(userData, {rejectWithValue}) {
    console.log(JSON.stringify(userData));
    try{
      const response = await fetch('https://blog.kata.academy/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        throw new Error('Регестрация не удачна');
      }
      const data = await response.json();
      return data;
    } catch(error) {
      return rejectWithValue(error.message);
    }
  }
);

const registrationSlice = createSlice({
  name: 'registration',
  initialState: {
    user: {},
    status: null,
    error: null,
  },
  reducers: {
    deleteUser(state) {
      console.log(state);
      state.user = {};
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
  }
});

export const {deleteUser} = registrationSlice.actions;
export default registrationSlice.reducer;