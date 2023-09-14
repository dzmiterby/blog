import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  changeOffset,
  changeUserLogin,
  setUser,
  setUserError,
  setUpdateError,
  changeCreateNewArticleStatus,
} from '../../store/storeblog';
import { fetchGetCurrentUser } from '../../serviceBlog/serviceBlog';

import classes from './Header.module.scss';
import avatar from './avatar.svg';

function Header() {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.blog.userLogin);
  const user = useSelector((state) => state.blog.user);

  const navigate = useNavigate();

  function goToMainPage() {
    dispatch(changeOffset(0));
  }

  function logOutAccount() {
    dispatch(changeUserLogin(false));
    dispatch(setUser(false));
    dispatch(setUserError(null));
    dispatch(setUpdateError(null));
  }

  function transitionToNewArticle() {
    dispatch(changeCreateNewArticleStatus(false));
    fetchGetCurrentUser(dispatch, user.token);
    navigate('/new-article', { replace: true });
  }

  function transitionToProfile() {
    fetchGetCurrentUser(dispatch, user.token);
    navigate('/profile', { replace: true });
  }

  return (
    <div className={classes.Header}>
      <div className={classes['header']}>
        <div className={classes['header__container']}>
          <Link to="/">
            <button className={classes['header__emblem']} type="button" onClick={goToMainPage}>
              Realworld Blog
            </button>
          </Link>
          {userLogin ? (
            <div className={classes['header__in-up']}>
              <button className={classes['header__create-article']} type="button" onClick={transitionToNewArticle}>
                Create article
              </button>
              <div style={{ display: 'flex' }}>
                <button className={classes['header__sign-in']} type="button" onClick={transitionToProfile}>
                  {user.username}
                </button>
                {user.image ? <img src={user.image} alt="avatar" /> : <img src={avatar} alt="avatar" />}
              </div>
              <Link to="/">
                <button
                  style={{ color: 'rgba(0, 0, 0, 0.75)', border: '1px solid rgba(0, 0, 0, 0.75)' }}
                  className={classes['header__sign-up']}
                  type="button"
                  onClick={logOutAccount}
                >
                  Log Out
                </button>
              </Link>
            </div>
          ) : (
            <div className={classes['header__in-up']}>
              <Link to="/sign-in">
                <button className={classes['header__sign-in']} type="button">
                  Sign In
                </button>
              </Link>
              <Link to="/sign-up">
                <button className={classes['header__sign-up']} type="button">
                  Sign Up
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
