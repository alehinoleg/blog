import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUpdateArticle = createAsyncThunk(
  'UpdateArticle/fetchUpdateArticle',
  async function(userData, {rejectWithValue}) {
    try{
      const response = await fetch(`https://blog.kata.academy/api/articles/${userData.slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Authorization': `Bearer ${userData.token}`,
        },
        body: JSON.stringify(userData.data),
      });
      if (!response.ok) {
        throw new Error('Server Error!');
      }
      const data = await response.json();
      return data;
    } catch(error) {
      return rejectWithValue(error.message);
    } 
  }
);