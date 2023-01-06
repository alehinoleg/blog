import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async function(offset = 1) {
    const response = await fetch(`https://blog.kata.academy/api/articles?limit=5&offset=${(offset - 1) * 5}`);
    const data = await response.json();
    return data;
  }
);

const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    articles: [],
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [fetchArticles.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchArticles.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.articles = action.payload;
    },
    [fetchArticles.rejected]: () => {},
  }
});

export default articlesSlice.reducer;