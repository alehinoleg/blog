import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async function(offset = 1) {
    const response = await fetch(`https://blog.kata.academy/api/articles?limit=5&${offset}`);
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
  reducers: {
    addArticles(state, action) {
      console.log(state);
      console.log(action);
    },
  },
  extraReducers: {
    [fetchArticles.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchArticles.fulfilled]: (state, action) => {
      console.log(action);
      state.status = 'resolved';
      state.articles = action.payload;
    },
    [fetchArticles.rejected]: () => {},
  }
});

export const { addArticles } = articlesSlice.actions;

export default articlesSlice.reducer;