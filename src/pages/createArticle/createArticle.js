import { useForm } from 'react-hook-form';

import style from './createArticle.module.scss'

const CreateArticle = () => {
  const {
    register,
    formState: {
      errors,
    },
    handleSubmit,
  } = useForm();
  return (
    <div className={style.block}>
      <form onSubmit={handleSubmit()}>
        <h2 className={style.title}>Create new article</h2>
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
          <label htmlFor="imput1" className={style.label}>Short description</label>
          <input type='text' id="imput1"
            placeholder="short description" className={errors?.shortdescription?style.inputTextError:style.inputText}
            {...register('shortdescription', 
              {required: 'Must not be empty'})}
          />
          <div className={style.errorsBlock}>
            {errors?.shortdescription && <p className={style.errors}>{errors?.shortdescription?.message || 'Error!'}</p>}
          </div>
        </div>
        <div className={style.info}>
          <label htmlFor="imput1" className={style.label}>Text</label>
          <textarea id="imput1"
            placeholder="short description" className={errors?.shortdescription?style.inputTextError:style.inputText}
            {...register('shortdescription', 
              {required: 'Must not be empty'})}
          />
          <div className={style.errorsBlock}>
            {errors?.shortdescription && <p className={style.errors}>{errors?.shortdescription?.message || 'Error!'}</p>}
          </div>
        </div>
        <div>
          <div>
                
          </div>
        </div>
      </form>
    </div>
  )
}

export default CreateArticle;