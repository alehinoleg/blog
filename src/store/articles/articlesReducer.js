import { ADD_ARTICLES, SET_ERROR, SET_LOADING, ADD_PAGINATION } from './articlesActions';

const initialState = {
  status: 'idle',
  list: [],
  error: null,
  pagination: 1
}

export const articleReducer = (state = initialState, action) => {
  switch(action.type) {
  case ADD_ARTICLES:
    return {
      ...state,
      list: action.payload,
      status: 'fullfied',
      pagination: 1
    }
  case SET_LOADING:
    return {
      ...state,
      status: 'loading',
      error: null
    }
  case SET_ERROR: 
    return {
      ...state,
      status: 'rejected',
      error:action.payload
    }
  case ADD_PAGINATION: 
    console.log(action);
    return {
      ...state,
      ...action.payload,
      /*pagination: action.page,*/
    }
  default:
    return state;
  }
}