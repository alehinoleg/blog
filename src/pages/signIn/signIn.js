import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

//import { fetchArticles } from '../../store/articlesSlice';
import { fetchSignIn } from '../../store/SignInSlice';

import style from './signIn.module.scss'

const SignIn = () => {
  const dispatch = useDispatch() 
  const navigate = useNavigate();
  const {
    register,
    formState: {
      errors,
    },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    const userData = {
      user: {
        email: data.emailAddress,
        password: data.password,
      }
    }
    dispatch(fetchSignIn(userData));
    navigate('/');
  }

  return (
    <div className={style.block}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className={style.title}>Sign In</h2>
        <div className={style.info}>
          <label htmlFor="imput1" className={style.label}>Email address</label>
          <input {...register('emailAddress', 
            {required: 'Must not be empty',
              pattern: {
                value: /@/,
                message: 'Email required'
              },
            })} id="imput1" 
          placeholder="Email address" className={errors?.emailAddress?style.inputTextError:style.inputText}/>
          <div className={style.errorsBlock}>
            {errors?.emailAddress && <p className={style.errors}>{errors?.emailAddress?.message || 'Error!'}</p>}
          </div>
        </div>
        <div className={style.info}>
          <label htmlFor="imput2" className={style.label}>Password</label>
          <input {...register('password', 
            {required: 'Must not be empty',
              minLength: {
                value: 6,
                message: 'minimum 6 characters'
              }
            })} id="imput2" 
          placeholder="Password" className={errors?.password?style.inputTextError:style.inputText}/>
          <div className={style.errorsBlock}>
            {errors?.password && <p className={style.errors}>{errors?.password?.message || 'Error!'}</p>}
          </div>
        </div>
        <input type='submit' value='Login' className={style.submit}/>
        <p className={style.p}>Don’t have an account? <Link to="/signup">Sign Up</Link>.</p>
      </form>
    </div>
  )
}

export default SignIn;