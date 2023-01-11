import { Link, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { deleteUser } from '../store/registration.js';
import { deleteUserSignIn } from '../store/SignInSlice.js';
import Avatar from '../img/avatar.js';

import style from './layout.module.scss';

const Layout = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const tokenRegistration = state.registration.user.token;
  const tokenSignIn = state.SignIn.user.token;
  const userNameRegistration = state.registration.user.username;
  const userNameSignIn = state.SignIn.user.username;
  //console.log(state);
  const onLogOutReg = () => dispatch(deleteUser());
  const onLogOutSignIn = () => dispatch(deleteUserSignIn());

  if (tokenRegistration || tokenSignIn) {
    return (
      <>
        <header className={style.header}>
          <Link to="/">Realworld Blog</Link>
          <div className={style.wrapperLinkAvt}>
            <Link to="" className={style.signup}>
              Create article
            </Link>
            <span className={style.name}>
              <Link to="/editprofile">{userNameRegistration || userNameSignIn}</Link>
            </span>
            <Avatar />
            <div>
              {tokenRegistration && <button onClick={onLogOutReg}>Log Out</button>}
              {tokenSignIn && <button onClick={onLogOutSignIn}>Log Out</button>}
            </div>
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
