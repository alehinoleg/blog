import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAddArticle = createAsyncThunk(
  'AddArticle/fetchAddArticle',
  async function(userData, {rejectWithValue}) {
    try{
      const response = await fetch('https://blog.kata.academy/api/articles', {
        method: 'POST',
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