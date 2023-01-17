import React, { useEffect, useState } from 'react';
import { Spin, Alert, Modal } from 'antd';
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    const userData = {
      slug: article.article.slug,
      token: token
    }
    dispatch(fetchDeleteArticle(userData));
    navigate('/');
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const smth = useParams();
  useEffect(() => {
    dispatch(fetchArticle(smth));
  }, []);
  const article = useSelector(state => state.article);
  const navigate = useNavigate();
  console.log(article);
  const userNamestate = useSelector(state => state.userActions);
  const token = userNamestate.user?.token;
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


    if (author === userNamestate.user?.username) {
      return (
        <div className={style.wraperPost}>
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
              
                <button className={style.delete} onClick={showModal}>Delete</button>
              
                <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} closable={false} className={!style.antModalContent}>
                  <div className={style.modal}>
                    <svg width="20" height="20" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 0C3.13438 0 0 3.13438 0 7C0 10.8656 3.13438 14 7 14C10.8656 14 14 10.8656 14 7C14 3.13438 10.8656 0 7 0ZM6.5 3.625C6.5 3.55625 6.55625 3.5 6.625 3.5H7.375C7.44375 3.5 7.5 3.55625 7.5 3.625V7.875C7.5 7.94375 7.44375 8 7.375 8H6.625C6.55625 8 6.5 7.94375 6.5 7.875V3.625ZM7 10.5C6.80374 10.496 6.61687 10.4152 6.47948 10.275C6.3421 10.1348 6.26515 9.9463 6.26515 9.75C6.26515 9.5537 6.3421 9.36522 6.47948 9.225C6.61687 9.08478 6.80374 9.00401 7 9C7.19626 9.00401 7.38313 9.08478 7.52052 9.225C7.6579 9.36522 7.73485 9.5537 7.73485 9.75C7.73485 9.9463 7.6579 10.1348 7.52052 10.275C7.38313 10.4152 7.19626 10.496 7 10.5Z" fill="#FAAD14"/>
                    </svg>
                    <p className={style.modalp}>Are you sure to delete this article?</p>
                  </div>
                </Modal>
          
                <button className={style.edit}>Edit</button>
              </section>
            </div>
            
          </div>
          <p><ReactMarkdown remarkPlugins={[[remarkGfm, {singleTilde: false}]]}>{body}</ReactMarkdown></p>
        </div>
      )
    }

    return (
      <div className={style.wraperPost}>
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
        
        </div>
        <p><ReactMarkdown remarkPlugins={[[remarkGfm, {singleTilde: false}]]}>{body}</ReactMarkdown></p>
      </div>
    )
  }
  
}

export default ArticleFull;