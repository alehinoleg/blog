import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { fetchfavoriteTrue } from './fetchfavoriteTrue';

export const fetchArticle = createAsyncThunk(
  'article/fetchArticle',
  async function(slug, {rejectWithValue}) {
    try{
      const response = await fetch(`https://blog.kata.academy/api/articles/${slug.slug}`);
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

const articleSlice = createSlice({
  name: 'article',
  initialState: {
    article: {},
    status: null,
    error: null,
  },
  reducers: {
    
  },
  extraReducers: {
    [fetchArticle.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchArticle.fulfilled]: (state, action) => {
      state.article = action.payload.article;
      state.status = 'resolved';
    },
    [fetchArticle.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
    [fetchfavoriteTrue.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.article = action.payload.article;
      state.status = 'resolved';
    },
  }
});

export default articleSlice.reducer;