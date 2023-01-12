import { createAsyncThunk } from '@reduxjs/toolkit';

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
