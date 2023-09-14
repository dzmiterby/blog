import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Space, Spin } from 'antd';

import { fetchUpdateCurrentUser } from '../../serviceBlog/serviceBlog';

import classes from './Profile.module.scss';

function Profile() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.blog.user);
  const isLoaded = useSelector((state) => state.blog.isLoaded);
  const userLogin = useSelector((state) => state.blog.userLogin);
  const updatedError = useSelector((state) => state.blog.updatedError);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onTouched' });

  const onSubmit = (data) => {
    const { username, email, password, image } = data;
    const newUser = JSON.stringify({ user: { username, email, password, image } });
    fetchUpdateCurrentUser(dispatch, user.token, newUser);
  };

  useEffect(() => {
    if (!userLogin) {
      navigate('/sign-in', { replace: true });
    }
  }, [userLogin, navigate]);

  return (
    <div className={classes.Profile}>
      {isLoaded && (
        <Space direction="vertical" style={{ width: '100%', margin: '70px 0 50px' }}>
          <Spin size="large">
            <div className="content" />
          </Spin>
        </Space>
      )}
      {!isLoaded && user && (
        <div className={classes['profile__container']}>
          <h1 className={classes['profile__h1']}>Edit Profile</h1>
          <form className={classes['profile__form']} onSubmit={handleSubmit(onSubmit)}>
            <label className={classes['form__label']}>
              Username
              <input
                style={{ borderColor: (errors.username && '#F5222D') || (updatedError && '#F5222D') }}
                className={classes['form__input']}
                type="text"
                placeholder="Username"
                defaultValue={user.username}
                {...register('username', {
                  required: 'This field is required.',
                  maxLength: {
                    value: 20,
                    message: 'Username must be from 3 to 20 characters (inclusive).',
                  },
                  minLength: {
                    value: 3,
                    message: 'Username must be from 3 to 20 characters (inclusive).',
                  },
                  pattern: {
                    value: /^[a-z][a-z0-9]*$/,
                    message: 'Username must consist of lowercase English letters and numbers.',
                  },
                })}
              />
              {errors?.username && <p style={{ color: '#F5222D' }}>{errors?.username?.message}</p>}
              {updatedError ? <p style={{ color: '#F5222D' }}>{updatedError.username}</p> : null}
            </label>
            <label className={classes['form__label']}>
              Email address
              <input
                style={{ borderColor: (errors.email && '#F5222D') || (updatedError && '#F5222D') }}
                className={classes['form__input']}
                type="email"
                placeholder="Email address"
                defaultValue={user.email}
                {...register('email', {
                  required: 'This field is required.',
                  pattern: {
                    value:
                      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
                    message: 'Email must be a valid email address.',
                  },
                })}
              />
              {errors?.email && <p style={{ color: '#F5222D' }}>{errors?.email?.message}</p>}
              {updatedError ? <p style={{ color: '#F5222D' }}>{updatedError.email}</p> : null}
            </label>
            <label className={classes['form__label']}>
              New password
              <input
                style={{ borderColor: errors.password && '#F5222D' }}
                className={classes['form__input']}
                type="password"
                placeholder="New password"
                {...register('password', {
                  required: 'This field is required.',
                  maxLength: {
                    value: 40,
                    message: 'Password must be between 6 and 40 characters (inclusive).',
                  },
                  minLength: {
                    value: 6,
                    message: 'Password must be between 6 and 40 characters (inclusive).',
                  },
                })}
              />
              {errors?.password && <p style={{ color: '#F5222D' }}>{errors?.password?.message}</p>}
            </label>
            <label className={classes['form__label']}>
              Avatar image (url)
              <input
                style={{ borderColor: errors.avatar && '#F5222D' }}
                className={classes['form__input']}
                type="text"
                placeholder="Avatar image"
                defaultValue={user.image}
                {...register('image', {
                  pattern: {
                    value: /^(ftp|http|https):\/\/[^ "]+$/,
                    message: 'Avatar image must be a valid url.',
                  },
                })}
              />
              {errors?.image && <p style={{ color: '#F5222D' }}>{errors?.image?.message}</p>}
            </label>
            <button className={classes['form__button']} type="submit">
              Save
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Profile;
