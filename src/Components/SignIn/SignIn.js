import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Space, Spin } from 'antd';

import { fetchInterAccount } from '../../serviceBlog/serviceBlog';

import classes from './SignIn.module.scss';

function SignIn() {
  const dispatch = useDispatch();

  const isLoaded = useSelector((state) => state.blog.isLoaded);
  const userLogin = useSelector((state) => state.blog.userLogin);
  const userError = useSelector((state) => state.blog.userError);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: 'onTouched' });

  const onSubmit = (data) => {
    const { email, password } = data;
    const exisUser = JSON.stringify({ user: { email, password } });
    fetchInterAccount(dispatch, exisUser);
  };

  useEffect(() => {
    if (userLogin) {
      reset();
      navigate('/', { replace: true });
    }
  }, [userLogin, reset, navigate]);

  return (
    <div className={classes.SignIn}>
      {isLoaded && (
        <Space direction="vertical" style={{ width: '100%', margin: '70px 0 50px' }}>
          <Spin size="large">
            <div className="content" />
          </Spin>
        </Space>
      )}
      {!isLoaded && !userLogin && (
        <div className={classes['signin__container']}>
          <h1 className={classes['signin__h1']}>Sign In</h1>
          <form className={classes['signin__form']} onSubmit={handleSubmit(onSubmit)}>
            <label className={classes['form__label']}>
              Email address
              <input
                style={{ borderColor: (errors.email && '#F5222D') || (userError && '#F5222D') }}
                className={classes['form__input']}
                type="email"
                placeholder="Email address"
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
              {userError ? <p style={{ color: '#F5222D' }}>Email or password is invalid</p> : null}
            </label>
            <label className={classes['form__label']}>
              Password
              <input
                style={{ borderColor: (errors.password && '#F5222D') || (userError && '#F5222D') }}
                className={classes['form__input']}
                type="password"
                placeholder="Password"
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
              {userError ? <p style={{ color: '#F5222D' }}>Email or password is invalid</p> : null}
            </label>
            <button className={classes['form__button']} type="submit">
              Login
            </button>
          </form>
          <p className={classes['form__sign-up']}>
            Already have an account?{' '}
            <Link to="/sign-up">
              <span>Sign Up</span>
            </Link>
            .
          </p>
        </div>
      )}
    </div>
  );
}

export default SignIn;
