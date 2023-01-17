import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchfavoriteTrue = createAsyncThunk(
  'favoriteTrue/fetchfavoriteTrue',
  async function(userData, {rejectWithValue}) {
    console.log(userData);
    try{
      const response = await fetch(`https://blog.kata.academy/api/articles/${userData.slug}/favorite`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Authorization': `Bearer ${userData.token}`,
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