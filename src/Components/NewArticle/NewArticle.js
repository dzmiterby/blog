import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import { Space, Spin } from 'antd';

import { fetchCreateArticle } from '../../serviceBlog/serviceBlog';

import classes from './NewArticle.module.scss';

function NewArticle() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.blog.user);
  const isLoaded = useSelector((state) => state.blog.isLoaded);
  const userLogin = useSelector((state) => state.blog.userLogin);
  const createNewArticleStatus = useSelector((state) => state.blog.createNewArticleStatus);

  const navigate = useNavigate();

  const {
    register,
    control,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onTouched' });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tag',
  });

  const onSubmit = (data) => {
    const { title, description, body, tag } = data;
    let tagList = [];
    for (let elem of tag) {
      tagList.push(elem.tag);
    }
    const newArticle = JSON.stringify({ article: { title, description, body, tagList } });
    fetchCreateArticle(dispatch, user.token, newArticle);
  };

  useEffect(() => {
    if (!userLogin) {
      navigate('/sign-in', { replace: true });
    }
    if (createNewArticleStatus) {
      navigate('/', { replace: true });
    }
  }, [userLogin, navigate, createNewArticleStatus]);

  return (
    <div className={classes.NewArticle}>
      {isLoaded && (
        <Space direction="vertical" style={{ width: '100%', margin: '70px 0 50px' }}>
          <Spin size="large">
            <div className="content" />
          </Spin>
        </Space>
      )}
      {!isLoaded && userLogin && !createNewArticleStatus && (
        <div className={classes['newarticle__container']}>
          <h1 className={classes['newarticle__h1']}>Create new article</h1>
          <form className={classes['newarticle__form']} onSubmit={handleSubmit(onSubmit)}>
            <label className={classes['form__label']}>
              Title
              <input
                style={{ borderColor: errors.title && '#F5222D' }}
                className={classes['form__input']}
                type="text"
                placeholder="Title"
                {...register('title', {
                  required: 'This field is required.',
                })}
              />
              {errors?.title && <p style={{ color: '#F5222D' }}>{errors?.title?.message}</p>}
            </label>
            <label className={classes['form__label']}>
              Short description
              <input
                style={{ borderColor: errors.description && '#F5222D' }}
                className={classes['form__input']}
                type="text"
                placeholder="Short description"
                {...register('description', {
                  required: 'This field is required.',
                })}
              />
              {errors?.description && <p style={{ color: '#F5222D' }}>{errors?.description?.message}</p>}
            </label>
            <label className={classes['form__label']}>
              Text
              <textarea
                style={{ borderColor: errors.text && '#F5222D' }}
                className={classes['form__input-textarea']}
                type="text"
                placeholder="Text"
                {...register('body', {
                  required: 'This field is required.',
                })}
              />
              {errors?.body && <p style={{ color: '#F5222D' }}>{errors?.body?.message}</p>}
            </label>
            <label className={classes['form__label']}>
              <ul>
                {fields.map((item, index) => (
                  <li key={item.id}>
                    <input
                      className={classes['form__input-tag']}
                      type="text"
                      placeholder="Tag"
                      {...register(`tag.${index}.tag`)}
                      value={item.tag}
                    />
                    <button className={classes['form__button-del']} type="button" onClick={() => remove(index)}>
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
              <div>
                <input className={classes['form__input-tag']} type="text" placeholder="Tag" {...register('valueTag')} />
                <button className={classes['form__button-del']} type="button" onClick={() => null}>
                  Delete
                </button>
                <button
                  className={classes['form__button-add']}
                  type="button"
                  onClick={() => {
                    let elInput = document.querySelectorAll('input');
                    if (elInput[elInput.length - 1].value) {
                      let value = getValues('valueTag');
                      for (let i = 0; i < fields.length; i++) {
                        if (fields[i].tag === value) {
                          return null;
                        }
                      }
                      append({ tag: `${value}` });
                      elInput[elInput.length - 1].value = '';
                    }
                  }}
                >
                  Add tag
                </button>
              </div>
            </label>
            <button className={classes['form__button']} type="submit">
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default NewArticle;
