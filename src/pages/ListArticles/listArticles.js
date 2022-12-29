import { useDispatch, useSelector } from 'react-redux';
import { Pagination, Spin } from 'antd'

import { addArticles } from '../../store/articles/articlesActions'
import Article from '../article/article';

import style from './listArticles.module.scss'

const ListArticles = () => {
  const listArticles = useSelector(state => state.articleReducer.list.articles);
  
  const {status} = useSelector(state => state.articleReducer); 
  const dispatch = useDispatch();
  console.log(listArticles);

  const onPaginationChange = (page) => {
    console.log(page)
    dispatch(addArticles(page));
  }

  if (status === 'loading') {
    return (
      <div className={style.spin}>
        <Spin size='large'/>
      </div>
    )
  }

  if (status === 'fullfied') {
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