import React from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { fetchfavoriteTrue } from '../../store/fetchfavoriteTrue'; 
import Like from '../like/like';

import style from './article.module.scss'

const Article = (props) => {
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const token = state.userActions.user.token;
  const {title, description, tagList, author, createdAt, favoritesCount, slug} = props;
  const tag = tagList.map((tag) => {
    return (
      <span key={nanoid()} className={style.tag}>{tag}</span>
    )
  })

  const onLike = () => {
    const userData = {
      token,
      slug
    }
    dispatch(fetchfavoriteTrue(userData))
  }
 
  return (
    <div className={style.post}>
      <div className={style.info}>
        <div className={style.blokTitle}>
          <Link to={`/articles/${slug}`} >
            <h2 className={style.title}>{title}</h2>
          </Link>
          <button className={style.like} onClick={onLike}>
            <Like/>
          </button>
          <span className={style.favoritesCount}>{favoritesCount}</span>
        </div>
        <div className={style.tagWrapper}>
          {tag}
        </div>
        <p className={style.text}>{description}</p>
      </div>
      <div className={style.infoAuthor}>
        <div className={style.author}>
          <span className={style.name}>{author.username}</span>
          <span className={style.data}>{createdAt.slice(0, 10)}</span>
        </div>
        <img src={author.image} className={style.img}/>
      </div>
    </div>
  )
}

export default Article;