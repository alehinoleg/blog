import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async function(articlesData, {rejectWithValue}) {
    try{
      const response = await fetch(`https://blog.kata.academy/api/articles?limit=5&offset=${(articlesData.offset - 1) * 5}`);
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

export const fetchArticlesToken = createAsyncThunk(
  'articles/fetchArticles',
  async function(articlesData, {rejectWithValue}) {
    try{
      const response = await fetch(`https://blog.kata.academy/api/articles?limit=5&offset=${(articlesData.offset - 1) * 5}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Authorization': `Bearer ${articlesData.token}`,
        },
        //body: JSON.stringify(articlesData),
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

const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    articles: [],
    status: null,
    error: null,
  },
  reducers: {
    fcStates(state, action) {
      console.log(action.payload);
      console.log(state.articles)
      state.articles = state.articles.map(ar => ar.slug === action.payload.slug ? {... action.payload } : ar)
    }
  },
  extraReducers: {
    [fetchArticles.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchArticles.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.articles = action.payload;
    },
    [fetchArticles.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
    [fetchArticlesToken.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.articles = action.payload;
    },
    [fetchArticlesToken.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
  }
});

export const {fcStates} = articlesSlice.actions;
export default articlesSlice.reducer;