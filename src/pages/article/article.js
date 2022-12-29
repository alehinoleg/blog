import React from 'react';
import { nanoid } from '@reduxjs/toolkit';

import style from './article.module.scss'

const Article = (props) => {
  const {title, description, tagList, author, createdAt} = props;
  const tag = tagList.map((tag) => {
    return (
      <span key={nanoid()} className={style.tag}>{tag}</span>
    )
  })
 
  return (
    <div className={style.post}>
      <div className={style.info}>
        <h2 className={style.title}>{title}</h2>
        {tag}
        <p className={style.text}>{description}</p>
      </div>
      <div className={style.infoAuthor}>
        <div className={style.author}>
          <span className={style.name}>{author.username}</span>
          <span className={style.data}>{createdAt.slice(0, 9)}</span>
        </div>
        <img src={author.image} className={style.img}/>
      </div>
    </div>
  )
}

export default Article;