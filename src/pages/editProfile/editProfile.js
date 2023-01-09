import React from 'react';

import style from './editProfile.module.scss'

const EditProfile = () => {
  return(
    <div className={style.block}>
      <form>
        <h2 className={style.title}>Edit Profile</h2>
        <div className={style.info}>
          <label htmlFor="imput1" className={style.label}>Username</label>
          <input type='text' id="imput1" placeholder="Username" />
        </div>
      </form>
    </div>
  )
}

export default EditProfile