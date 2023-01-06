import { Link, Outlet } from 'react-router-dom';

import style from './layout.module.scss';

const Layout = () => {
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
