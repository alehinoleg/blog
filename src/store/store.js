import { configureStore } from '@reduxjs/toolkit';

import articlesReducer from './articlesSlice';
import articleSlice from './articleSlice';

export default configureStore({
  reducer: {
    articles: articlesReducer,
    article: articleSlice
  }
});