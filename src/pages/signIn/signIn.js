import React from 'react';

import style from './signIn.module.scss'

const SignIn = () => {
  return (
    <div className={style.block}>
      <form>
        <h2 className={style.title}>Sign In</h2>
        <div className={style.info}>
          <label htmlFor="imput1" className={style.label}>Email address</label>
          <input type='text' id="imput1"
            name="contact" placeholder="Email address" className={style.inputText}/>
        </div>
        <div className={style.info}>
          <label htmlFor="imput2" className={style.label}>Password</label>
          <input type='text' id="imput2"
            name="contact" placeholder="Password" className={style.inputText}/>
        </div>
        <input type='submit' value='Login' className={style.submit}/>
        <p className={style.p}>Don’t have an account? Sign Up.</p>
      </form>
    </div>
  )
}

export default SignIn;