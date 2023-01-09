import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import style from './signUp.module.scss'

const SignUp = () => {
  const {
    register,
    formState: {
      errors,
    },
    handleSubmit,
    watch
  } = useForm();
  const password = useRef({});
  password.current = watch('password', '');

  const onSubmit = async data => {
    console.log(data);
    alert(JSON.stringify(data));
  }

  return (
    <div className={style.block}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className={style.title}>Create new account</h2>
        <div className={style.info}>
          <label htmlFor="imput1" className={style.label}>Username</label>
          <input type='text' id="imput1"
            placeholder="Username" className={errors?.username?style.inputTextError:style.inputText}
            {...register('username', 
              {required: 'Must not be empty',
                minLength: {
                  value: 6,
                  message: 'min: 6 characters'
                },
                maxLength: {
                  value: 20,
                  message: 'Max: 20 symbols'
                }
              })}
          />
          <div className={style.errorsBlock}>
            {errors?.username && <p className={style.errors}>{errors?.username?.message || 'Error!'}</p>}
          </div>
        </div>
        <div className={style.info}>
          <label htmlFor="imput2" className={style.label}>Email address</label>
          <input type='text' id="imput2"
            placeholder="Email address" className={errors?.emailAddress?style.inputTextError:style.inputText}
            {...register('emailAddress', 
              {required: 'Must not be empty',
                pattern: {
                  value: /@/,
                  message: 'Email required'
                },
              })}
          />
          <div className={style.errorsBlock}>
            {errors?.emailAddress && <p className={style.errors}>{errors?.emailAddress?.message || 'Error!'}</p>}
          </div>
        </div>
        <div className={style.info}>
          <label htmlFor="imput3" className={style.label}>Password</label>
          <input type='password' id="imput3"
            placeholder="Password" className={errors?.password?style.inputTextError:style.inputText}
            {...register('password', 
              {required: 'Must not be empty',
                minLength: {
                  value: 6,
                  message: 'min: 6 characters'
                },
                maxLength: {
                  value: 40,
                  message: 'Max: 40 symbols'
                }
              })}
          />
          <div className={style.errorsBlock}>
            {errors?.password && <p className={style.errors}>{errors?.password?.message || 'Error!'}</p>}
          </div>
        </div>
        <div className={style.info}>
          <label htmlFor="imput4" className={style.label}>Repeat Password</label>
          <input type='password' id="imput4"
            placeholder="Repeat Password" className={errors?.repeatPassword?style.inputTextError:style.inputText}
            {...register('repeatPassword', 
              {required: 'Must not be empty',
                minLength: {
                  value: 6,
                  message: 'min: 6 characters'
                },
                maxLength: {
                  value: 40,
                  message: 'Max: 40 symbols'
                },
                
                validate: value => value === password.current || 'The passwords do not match'
                
              })}
          />
          <div className={style.errorsBlock}>
            {errors?.repeatPassword && <p className={style.errors}>{errors.repeatPassword.message || 'Error!'}</p>}
          </div>
        </div>
        <div className={style.blockCheckbox}>
          <input type='checkbox' id="imput5"
            className={style.checkbox}
            {...register('checkbox', 
              {
                required: 'Mark consent'
              })}
          />
          <label htmlFor="imput5" className={style.label}>I agree to the processing of my personal 
          information</label>
        </div>
        <div className={style.errorsBlock}>
          {errors?.checkbox && <p className={style.errors}>{errors?.checkbox?.message}</p>}
        </div>
        <input type='submit' value='Create' className={style.submit}/>
        <p className={style.p}>Don’t have an account? <Link to="/signin">Sign In</Link>.</p>
      </form>
    </div>
  )
}

export default SignUp;