import { combineReducers } from '@reduxjs/toolkit';

import { articleReducer } from './articles/articlesReducer';

export const rootReducer = combineReducers({
  articleReducer,
});