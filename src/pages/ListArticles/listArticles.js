import {  useSelector, useDispatch } from 'react-redux';
import React, { useEffect , useState } from 'react';
import { nanoid } from '@reduxjs/toolkit';
//import { useEffect } from 'react';
import { Pagination, Spin, Alert } from 'antd';

import { fetchArticles, fetchArticlesToken } from '../../store/articlesSlice';
import Article from '../article'


//import Article from '../article/article';

import style from './listArticles.module.scss'

const ListArticles = () => {
  const state = useSelector(state => state);
  const token = state.userActions.user?.token;
  const slagState = state.article.article?.slug;
  const dispatch = useDispatch();
  const listArticles =  state.articles.articles.articles;
  const {status, error } =  state.articles
  const [current, setCurrent] = useState(1);
  console.log(state);
  
  useEffect(() => {
    const articlesData = {
      offset: 1,
      token,
    }
    if (token) {
      console.log('Сейчас с токеным');
      dispatch(fetchArticlesToken(articlesData));
    } else {
      console.log('Сейчас без токеным');
      dispatch(fetchArticles(articlesData));
    }
  }, [token])
  
  if (status === 'loading') {
    return (
      <div className={style.spin}>
        <Spin size='large'/>
      </div>
    )
  }

  if (status === 'rejected') {
    return (
      <div className={style.error}>
        <Alert
          message="Error"
          description = {error}
          type="error"
          showIcon
        />
      </div>
    )
  }

  const onPaginationChange = (page) => {
    const articlesData = {
      offset: page,
      token,
    }
    if (token) {
      console.log('Сейчас с токеным');
      dispatch(fetchArticlesToken(articlesData));
    } else {
      console.log('Сейчас без токеным');
      dispatch(fetchArticles(articlesData));
    }
    setCurrent(page);
  }

  if (status === 'resolved') {
    const article = listArticles.map(({title, slug, description, tagList, author, createdAt, favoritesCount}, index) => {
      if (slagState === slug) {
        console.log(index, 'index');
        return <Article key={nanoid()} title={title} description={description} 
          tagList = {tagList} author={author} createdAt={createdAt} favoritesCount={favoritesCount + 1} slug={slug}/>
      }
      return <Article key={nanoid()} title={title} description={description} 
        tagList = {tagList} author={author} createdAt={createdAt} favoritesCount={favoritesCount} slug={slug}/>
    })
    return (
      <div>
        {article}
        <Pagination onChange = {(res) => onPaginationChange(res)} total={10000} className={style.pagination} current = {current}/>
      </div>
    )
  }
}

export default ListArticles;