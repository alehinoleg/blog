import { configureStore } from '@reduxjs/toolkit';

import articlesReducer from './articlesSlice';
import articleSlice from './articleSlice';
import userActions from './userActions';
//import SignInSlice from './SignInSlice';

export default configureStore({
  reducer: {
    articles: articlesReducer,
    article: articleSlice,
    userActions: userActions,
    //SignIn: SignInSlice
  }
});