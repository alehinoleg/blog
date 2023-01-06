import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchArticle = createAsyncThunk(
  'article/fetchArticle',
  async function(slug) {
    console.log(slug);
    const response = await fetch(`https://blog.kata.academy/api/articles/${slug.slug}`);
    const data = await response.json();
    console.log(data);
    return data;
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
      console.log(action.payload.article);
      state.article = action.payload.article;
      state.status = 'resolved';
    },
    [fetchArticle.rejected]: () => {},
  }
});

export default articleSlice.reducer;