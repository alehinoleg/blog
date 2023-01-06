import React from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { Link } from 'react-router-dom';

import Like from '../like/like';

import style from './article.module.scss'

const Article = (props) => {
  const {title, description, tagList, author, createdAt, favoritesCount, slug} = props;
  const tag = tagList.map((tag) => {
    return (
      <span key={nanoid()} className={style.tag}>{tag}</span>
    )
  })
 
  return (
    <div className={style.post}>
      <div className={style.info}>
        <div className={style.blokTitle}>
          <Link to={`/articles/${slug}`} >
            <h2 className={style.title}>{title}</h2>
          </Link>
          <Like/>
          <span className={style.favoritesCount}>{favoritesCount}</span>
        </div>
        {tag}
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