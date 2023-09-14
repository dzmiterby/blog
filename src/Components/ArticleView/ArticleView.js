import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import ReactMarkdown from 'react-markdown';
import { Tag, Button, Popconfirm } from 'antd';

import { changeUpdateArticleStatus } from '../../store/storeblog';
import { fetchDelArticle, fetchFavoriteArticle, fetchUnFavoriteArticle } from '../../serviceBlog/serviceBlog';

import classes from './ArticleView.module.scss';
import heart from './heart.svg';
import heartred from './heartred.svg';
import avatar from './avatar.svg';

function ArticleView() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.blog.user);
  const userLogin = useSelector((state) => state.blog.userLogin);
  const location = useLocation();
  const { title, slug, tagList, description, date, author, body, favor, favorCount } = location.state;

  const [favorArticleView, setFavor] = useState(favor);
  const [favorCountArticleView, setFavorCount] = useState(favorCount);

  const navigate = useNavigate();

  function delLike() {
    if (!userLogin) return null;
    setFavor(false);
    setFavorCount((c) => c - 1);
    fetchUnFavoriteArticle(user.token, slug);
  }

  function addLike() {
    if (!userLogin) return null;
    setFavor(true);
    setFavorCount((c) => c + 1);
    fetchFavoriteArticle(user.token, slug);
  }

  let verifyUser = false;
  if (userLogin) {
    if (user.username === author.username) verifyUser = true;
  }

  function delArticle() {
    fetchDelArticle(user.token, slug);
    navigate('/', { replace: true });
  }

  return (
    <div className={classes.ArticleView}>
      <div className={classes['articleView__container']}>
        <div className={classes['article']}>
          <div className={classes['article__container']}>
            <div className={classes['article__info']}>
              <div>
                <h1 className={classes['article__title']}>{title}</h1>
                {favorArticleView ? (
                  <>
                    <img src={heartred} alt="like" onClick={delLike} />
                    <span>{favorCountArticleView}</span>
                  </>
                ) : (
                  <>
                    <img src={heart} alt="dislike" onClick={addLike} />
                    <span>{favorCountArticleView}</span>
                  </>
                )}
              </div>
              {tagList.map((item) => (
                <Tag style={{ backgroundColor: '#FFFFFF', marginTop: '5px' }} key={uuid()}>
                  {item}
                </Tag>
              ))}
              <p style={{ marginTop: '5px' }}>{description}</p>
            </div>
            <div className={classes['article__info-user']}>
              <div className={classes['article__info-user1']}>
                <div className={classes['info-user__box1']}>
                  <span className={classes['info-user__name']}>{author.username}</span>
                  <span className={classes['info-user__date']}>{date}</span>
                </div>
                <div className={classes['info-user__box2']}>
                  {author.image ? <img src={author.image} alt="avatar" /> : <img src={avatar} alt="avatar" />}
                </div>
              </div>
              {verifyUser && (
                <div className={classes['article__info-user2']}>
                  <Popconfirm
                    placement="rightTop"
                    title="Are you sure to delete this article?"
                    onConfirm={delArticle}
                    cancelText="No"
                    okText="Yes"
                  >
                    <Button className={classes['article__info-del']} danger>
                      Delate
                    </Button>
                  </Popconfirm>
                  <Link
                    to={`/articles/${slug}/edit`}
                    state={{
                      title: title,
                      slug: slug,
                      tagList: tagList,
                      description: description,
                      body: body,
                    }}
                  >
                    <button
                      className={classes['article__info-edit']}
                      type="button"
                      onClick={() => dispatch(changeUpdateArticleStatus(false))}
                    >
                      Edit
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={classes['articleView__text']}>
          <ReactMarkdown>{body}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
export default ArticleView;
