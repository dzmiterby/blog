import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Space, Spin } from 'antd';
import { useForm } from 'react-hook-form';

import { fetchCreateNewAccount } from '../../serviceBlog/serviceBlog';

import classes from './SignUp.module.scss';

function SignUp() {
  const dispatch = useDispatch();

  const isLoaded = useSelector((state) => state.blog.isLoaded);
  const user = useSelector((state) => state.blog.user);
  const userError = useSelector((state) => state.blog.userError);

  const navigate = useNavigate();

  const {
    register,
    watch,
    getValues,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: 'onTouched' });

  const onSubmit = (data) => {
    const { username, email, password } = data;
    const newUser = JSON.stringify({ user: { username, email, password } });
    fetchCreateNewAccount(dispatch, newUser);
  };

  useEffect(() => {
    if (user) {
      reset();
      navigate('/sign-in', { replace: true });
    }
  }, [user, reset, navigate]);

  return (
    <div className={classes.SignUp}>
      {isLoaded && (
        <Space direction="vertical" style={{ width: '100%', margin: '70px 0 50px' }}>
          <Spin size="large">
            <div className="content" />
          </Spin>
        </Space>
      )}
      {!isLoaded && !user && (
        <div className={classes['signup__container']}>
          <h1 className={classes['signup__h1']}>Create new account</h1>
          <form className={classes['signup__form']} onSubmit={handleSubmit(onSubmit)}>
            <label className={classes['form__label']}>
              Username
              <input
                style={{ borderColor: (errors.username && '#F5222D') || (userError && '#F5222D') }}
                className={classes['form__input']}
                type="text"
                placeholder="Username"
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
              {userError ? (
                <p style={{ color: '#F5222D' }}>{`${getValues('username')} ${userError.username}`}</p>
              ) : null}
            </label>
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
              {userError ? <p style={{ color: '#F5222D' }}>{`${getValues('email')} ${userError.email}`}</p> : null}
            </label>
            <label className={classes['form__label']}>
              Password
              <input
                style={{ borderColor: errors.password && '#F5222D' }}
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
            </label>
            <label className={classes['form__label']}>
              Repeat password
              <input
                style={{ borderColor: errors.repeatPassword && '#F5222D' }}
                className={classes['form__input']}
                type="password"
                placeholder="Password"
                {...register('repeatPassword', {
                  required: 'This field is required.',
                  validate: (val) => {
                    if (watch('password') !== val) {
                      return 'Passwords must match';
                    }
                    return null;
                  },
                })}
              />
              {errors?.repeatPassword && <p style={{ color: '#F5222D' }}>{errors?.repeatPassword?.message}</p>}
            </label>
            <label className={classes['form__label-checkbox']}>
              <input
                className={classes['form__input-checkbox']}
                type="checkbox"
                {...register('agree', {
                  required: 'This field is required',
                })}
              />
              <span style={{ color: errors.agree && '#F5222D' }}>
                I agree to the processing of my personal information
              </span>
            </label>
            <button className={classes['form__button']} type="submit">
              Create
            </button>
          </form>
          <p className={classes['form__sign-in']}>
            Already have an account?{' '}
            <Link to="/sign-in">
              <span>Sign In</span>
            </Link>
            .
          </p>
        </div>
      )}
    </div>
  );
}

export default SignUp;
