import React, {useRef} from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { fetchEditProfile } from '../../store/fetchEditProfile';

import style from './editProfile.module.scss'

const EditProfile = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const token = state.userActions.user?.token;
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

  const onSubmit = (data) => {
    const userData = {
      user: {
        email: data.emailAddress,
        password: data.password,
        username: data.username,
        bio: '',
        image: data.avatar,
        token: token,        
      }
    }
    dispatch(fetchEditProfile(userData));
  }

  return(
    <div className={style.block}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className={style.title}>Edit Profile</h2>
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
          <label htmlFor="imput3" className={style.label}>New password</label>
          <input type='password' id="imput3"
            placeholder="New password" className={errors?.password?style.inputTextError:style.inputText}
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
          <label htmlFor="imput4" className={style.label}>Avatar image (url)</label>
          <input type='text' id="imput4"
            placeholder="Avatar image (url)" className={errors?.username?style.inputTextError:style.inputText}
            {...register('avatar', 
              {required: 'Must not be empty',
                minLength: {
                  value: 1,
                  message: 'min: 1 characters'
                },
              })}
          />
          <div className={style.errorsBlock}>
            {errors?.avatar && <p className={style.errors}>{errors?.avatar?.message || 'Error!'}</p>}
          </div>
        </div>
        <input type='submit' value='Save' className={style.submit}/>
      </form>
    </div>
  )
}

export default EditProfile