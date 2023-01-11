import { configureStore } from '@reduxjs/toolkit';

import articlesReducer from './articlesSlice';
import articleSlice from './articleSlice';
import registrationSlice from './registration'
import SignInSlice from './SignInSlice';

export default configureStore({
  reducer: {
    articles: articlesReducer,
    article: articleSlice,
    registration: registrationSlice,
    SignIn: SignInSlice
  }
});