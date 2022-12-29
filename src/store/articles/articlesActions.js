//import { useSelector } from 'react-redux';

import { client } from '../../api';

export const ADD_ARTICLES = 'ADD_ARTICLES';
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';
export const ADD_PAGINATION = 'ADD_PAGINATION';

export const addArticles = (articles) => ({
  type: ADD_ARTICLES,
  payload: articles,
})

export const setLoading = () => ({
  type: SET_LOADING
})

export const setError = (err) => ({
  type: SET_ERROR,
  payload: err,
})

export const addPagination = (page) => ({
  type: ADD_PAGINATION,
  payload: loadArticles(page)
})

export const loadArticles = () => (dispatch) => {
  dispatch(setLoading())
  client('https://blog.kata.academy/api/articles?limit=5&offset=2')
    .then(data => dispatch(addArticles(data)))
    .catch(err => dispatch(setError(err)))
}