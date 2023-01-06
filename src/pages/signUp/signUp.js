import React from 'react';
import { Link } from 'react-router-dom';

import style from './signUp.module.scss'

const SignUp = () => {
  return (
    <div className={style.block}>
      <h2 className={style.title}>Create new account</h2>
      <div className={style.info}>
        <label htmlFor="imput1" className={style.label}>Username</label>
        <input type='text' id="imput1"
          name="contact" placeholder="Username" className={style.inputText}/>
      </div>
      <div className={style.info}>
        <label htmlFor="imput2" className={style.label}>Email address</label>
        <input type='text' id="imput2"
          name="contact" placeholder="Email address" className={style.inputText}/>
      </div>
      <div className={style.info}>
        <label htmlFor="imput3" className={style.label}>Password</label>
        <input type='text' id="imput3"
          name="contact" placeholder="Password" className={style.inputText}/>
      </div>
      <div className={style.info}>
        <label htmlFor="imput4" className={style.label}>Repeat Password</label>
        <input type='text' id="imput4"
          name="contact" placeholder="Repeat Password" className={style.inputText}/>
      </div>
      <div className={style.blockCheckbox}>
        <input type='checkbox' id="imput5"
          name="contact" placeholder="Repeat Password" className={style.checkbox}/>
        <label htmlFor="imput5" className={style.label}>I agree to the processing of my personal 
        information</label>
      </div>
      <input type='submit' value='Create' className={style.submit}/>
      <p className={style.p}>Don’t have an account? <Link to="/signin">Sign In</Link>.</p>
    </div>
  )
}

export default SignUp;