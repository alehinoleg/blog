import {  useSelector } from 'react-redux';
import { Pagination, Spin } from 'antd';

import Article from '../article'


//import Article from '../article/article';

import style from './listArticles.module.scss'

const ListArticles = () => {
  const state = useSelector(state => state);
  const listArticles = useSelector(state => state.articles.articles.articles);
  const status = useSelector(state => state.articles.status)
  console.log(state);
  console.log(status);
  console.log(listArticles);

  const onPaginationChange = (page) => {
    console.log(page);
  }

  if (status === 'loading') {
    return (
      <div className={style.spin}>
        <Spin size='large'/>
      </div>
    )
  }

  if (status === 'resolved') {
    const article = listArticles.map(({title, slug, description, tagList, author, createdAt}) => {
      return <Article key={slug} title={title} description={description} 
        tagList = {tagList} author={author} createdAt={createdAt}/>
    })
    return (
      <div>
        {article}
        <Pagination defaultCurrent={1} total={80} className={style.pagination} onChange = {(res) =>onPaginationChange(res)}/>
      </div>
    )
  }
}

export default ListArticles;