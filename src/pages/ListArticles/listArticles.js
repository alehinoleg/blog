import {  useSelector, useDispatch } from 'react-redux';
import React, { useEffect , useState } from 'react';
import { nanoid } from '@reduxjs/toolkit';
//import { useEffect } from 'react';
import { Pagination, Spin, Alert } from 'antd';

import { fetchArticles } from '../../store/articlesSlice';
import Article from '../article'


//import Article from '../article/article';

import style from './listArticles.module.scss'

const ListArticles = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const listArticles =  state.articles.articles.articles;
  const {status, error } =  state.articles
  
  console.log(state);
  const [current, setCurrent] = useState(1);

 

  useEffect(() => {
    dispatch(fetchArticles(1));
  }, [])

  /*{status === 'loading' && <div className={style.spin}>
    <Spin size='large'/>
  </div>}*/
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
    dispatch(fetchArticles(page))
    setCurrent(page);
  }

  if (status === 'resolved') {
    const article = listArticles.map(({title, slug, description, tagList, author, createdAt, favoritesCount}) => {
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