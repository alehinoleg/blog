import React, { useEffect } from 'react';
import { Spin, Alert } from 'antd';
import { nanoid } from '@reduxjs/toolkit';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { fetchDeleteArticle } from '../../store/fetchDeleteArticle';
import Like from '../like/like';
import { fetchArticle } from '../../store/articleSlice';

import style from './articleFull.module.scss';

const ArticleFull = () => {
  const smth = useParams();
  useEffect(() => {
    dispatch(fetchArticle(smth));
  }, []);
  const article = useSelector(state => state.article);
  const navigate = useNavigate();
  console.log(article);
  const userNamestate = useSelector(state => state.userActions);
  const token = userNamestate.user.token;
  const dispatch = useDispatch();
  const {status, error} = article;
  
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

  if (status === 'loading') {
    return (
      <div className={style.spin}>
        <Spin size='large'/>
      </div>
    )
  }

  if (status === 'resolved') {
    console.log(article.article);
    const {title, favoritesCount, description, createdAt, tagList, body} = article.article;
    const author = article.article.author.username;
    const img = article.article.author.image;
    const tag = tagList.map((tag) => {
      return (
        <span key={nanoid()} className={style.tag}>{tag}</span>
      )
    })
    const onDelete = () => {
      const userData = {
        slug: article.article.slug,
        token: token
      }
      dispatch(fetchDeleteArticle(userData));
      navigate('/');
    }

    if (author === userNamestate.user.username) {
      return (
        <div className={style.post}>
          <div className={style.info}>
            <div className={style.blokTitle}>
              <h2 className={style.title}>{title}</h2>
              <Like/>
              <span className={style.favoritesCount}>{favoritesCount}</span>
            </div>
            {tag}
            <p className={style.text}>{description}</p>
          </div>
          <div className={style.infoAuthor}>
            <div className={style.author}>
              <span className={style.name}>{author}</span>
              <span className={style.data}>{createdAt.slice(0, 10)}</span>
            </div>
            <img src={img} className={style.img}/>
            <section className={style.wrapperButton}>
              <button className={style.delete} onClick={onDelete}>Delete</button>
              <button className={style.edit}>Edit</button>
            </section>
          </div>
          <p><ReactMarkdown remarkPlugins={[[remarkGfm, {singleTilde: false}]]}>{body}</ReactMarkdown></p>
        </div>
      )
    }

    return (
      <div className={style.post}>
        <div className={style.info}>
          <div className={style.blokTitle}>
            <h2 className={style.title}>{title}</h2>
            <Like/>
            <span className={style.favoritesCount}>{favoritesCount}</span>
          </div>
          {tag}
          <p className={style.text}>{description}</p>
        </div>
        <div className={style.infoAuthor}>
          <div className={style.author}>
            <span className={style.name}>{author}</span>
            <span className={style.data}>{createdAt.slice(0, 10)}</span>
          </div>
          <img src={img} className={style.img}/>
        </div>
        <p><ReactMarkdown remarkPlugins={[[remarkGfm, {singleTilde: false}]]}>{body}</ReactMarkdown></p>
      </div>
    )
  }
  
}

export default ArticleFull;