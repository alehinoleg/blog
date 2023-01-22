import React, { useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { exitUser, bbb } from '../store/userActions.js';
import Avatar from '../img/avatar.js';
import { useLocalStorage } from '../pages/signIn/signIn.js';

import style from './layout.module.scss';

const Layout = () => {
  const state = useSelector((state) => state);
  const { storage } = useLocalStorage(null, 'user');
  const dispatch = useDispatch();
  //const user = state.userActions.user;
  const tokenUser = state.userActions.user?.token;
  const userName = state.userActions.user?.username;
  const ava = state.userActions.user?.image;
  const exetUser = () => {
    dispatch(exitUser());
    localStorage.removeItem('user');
  };

  useEffect(() => {
    if (storage) {
      //signIn(storage);
      dispatch(bbb(storage));
    }
  }, [storage]);

  if (tokenUser) {
    //setStorage(() => user);
    return (
      <>
        <header className={style.header}>
          <Link to="/">Realworld Blog</Link>
          <div className={style.wrapperLinkAvtUser}>
            <Link to="/new-article" className={style.signup}>
              Create article
            </Link>
            <div className={style.userInfo}>
              <span className={style.name}>
                <Link to="/editprofile">{userName}</Link>
              </span>
              {ava ? (
                <img src={`${ava}`} className={style.ava} />
              ) : (
                <div className={style.Avatar}>
                  <Avatar />
                </div>
              )}
            </div>
            <button onClick={exetUser}>Log Out</button>
          </div>
        </header>
        <Outlet />
      </>
    );
  }

  return (
    <>
      <header className={style.header}>
        <Link to="/">Realworld Blog</Link>
        <div className={style.wrapperLink}>
          <Link to="/signin">Sign In</Link>
          <Link to="/signup" className={style.signup}>
            Sign Up
          </Link>
        </div>
      </header>
      <Outlet />
    </>
  );
};

export { Layout };
