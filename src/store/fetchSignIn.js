import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchSignIn = createAsyncThunk(
  'SignIn/fetchSignIn',
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
