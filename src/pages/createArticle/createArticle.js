import { useForm, useFieldArray } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate , useParams } from 'react-router-dom';

import { fetchAddArticle } from '../../store/fetchAddArticle';
import { fetchUpdateArticle } from '../../store/fetchUpdateArticle';

import style from './createArticle.module.scss';

const CreateArticle = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector(state => state);
  const token = state.userActions.user?.token;
  const params = useParams();
  const article = state.article.article;
  const slug = article.slug;
  
  const {
    register,
    formState: {
      errors,
    },
    handleSubmit,
    control
  } = useForm({
    defaultValues: {
      tagList: []
    },
  });
  const { fields, append, remove} = useFieldArray({
    name: 'tagList',
    control,
  })

  const onSubmit = (article) => {
    const userData = {
      data: {
        article
      },
      token,
    }
    dispatch(fetchAddArticle(userData));
    navigate('/');
  }

  const updateSubmit = (article) => {
    const userData = {
      data: {
        article
      },
      token,
      slug,
    }
    dispatch(fetchUpdateArticle(userData));
    navigate('/');
  }

  if (params.edit === 'edit') {
    return (
      <div className={style.block}>
        <form onSubmit={handleSubmit(updateSubmit)}>
          <h2 className={style.title}>Edit article</h2>
          <div className={style.info}>
            <label htmlFor="imput1" className={style.label}>Title</label>
            <input type='text' id="imput1" defaultValue={article.title} /*onInput="this.parentElement.dataset.val = this.value"*/
              placeholder="title" className={errors?.title?style.inputTextError:style.inputText}
              {...register('title', 
                {required: 'Must not be empty'})}
            />
            <div className={style.errorsBlock}>
              {errors?.title && <p className={style.errors}>{errors?.title?.message || 'Error!'}</p>}
            </div>
          </div>
          <div className={style.info}>
            <label htmlFor="imput2" className={style.label}>Short description</label>
            <input type='text' id="imput2" defaultValue={article.description}
              placeholder="description" className={errors?.description?style.inputTextError:style.inputText}
              {...register('description', 
                {required: 'Must not be empty'})}
            />
            <div className={style.errorsBlock}>
              {errors?.description && <p className={style.errors}>{errors?.description?.message || 'Error!'}</p>}
            </div>
          </div>
          <div className={style.info}>
            <label htmlFor="imput3" className={style.label}>Text</label>
            <textarea id="imput3" rows='15' defaultValue={article.body}
              placeholder="text" className={errors?.body?style.inputTextError:style.inputText}
              {...register('body', 
                {required: 'Must not be empty'})}
            />
            <div className={style.errorsBlock}>
              {errors?.body && <p className={style.errors}>{errors?.body?.message || 'Error!'}</p>}
            </div>
          </div>
          
          <div className={style.wrapperS} >
            <label htmlFor="imput4" className={style.label}>Tags</label>
            <div className={style.wrapperTeg}>
              
              {article.tagList.map((field, index) => {
                return <section key={index} className={style.sectionTag}>
                  <input {...register(`tagList.${index}`)} className={style.inputText} placeholder='tag' defaultValue={field}/>
                  <button type='button' onClick={() => remove(index)} className={style.delete}>Delete</button>
                </section>
              })}
              <button type='button' onClick={() => {
                append('');
              }} className={style.addTag}>Add tag</button>
            </div> 
          </div>
          <input type='submit' value='Send' className={style.submit}/>
        </form>
      </div>
    )
  }

  return (
    <div className={style.block}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {params.edit === 'edit' ? <h2 className={style.title}>Edit article</h2> : <h2 className={style.title}>Create new article</h2>}
        <div className={style.info}>
          <label htmlFor="imput1" className={style.label}>Title</label>
          <input type='text' id="imput1"
            placeholder="title" className={errors?.title?style.inputTextError:style.inputText}
            {...register('title', 
              {required: 'Must not be empty'})}
          />
          <div className={style.errorsBlock}>
            {errors?.title && <p className={style.errors}>{errors?.title?.message || 'Error!'}</p>}
          </div>
        </div>
        <div className={style.info}>
          <label htmlFor="imput2" className={style.label}>Short description</label>
          <input type='text' id="imput2"
            placeholder="description" className={errors?.description?style.inputTextError:style.inputText}
            {...register('description', 
              {required: 'Must not be empty'})}
          />
          <div className={style.errorsBlock}>
            {errors?.description && <p className={style.errors}>{errors?.description?.message || 'Error!'}</p>}
          </div>
        </div>
        <div className={style.info}>
          <label htmlFor="imput3" className={style.label}>Text</label>
          <textarea id="imput3" rows='15'
            placeholder="text" className={errors?.body?style.inputTextError:style.inputText}
            {...register('body', 
              {required: 'Must not be empty'})}
          />
          <div className={style.errorsBlock}>
            {errors?.body && <p className={style.errors}>{errors?.body?.message || 'Error!'}</p>}
          </div>
        </div>
        
        <div className={style.wrapperS} >
          <label htmlFor="imput4" className={style.label}>Tags</label>
          <div className={style.wrapperTeg}>
            
            {fields.map((field, index) => {
              return <section key={field.id} className={style.sectionTag}>
                <input {...register(`tagList.${index}`)} className={style.inputText} placeholder='tag'/>
                <button type='button' onClick={() => remove(index)} className={style.delete}>Delete</button>
              </section>
            })}
            <button type='button' onClick={() => {
              append('');
            }} className={style.addTag}>Add tag</button>
          </div> 
        </div>
        <input type='submit' value='Send' className={style.submit}/>
      </form>
    </div>
  )
}

export default CreateArticle;