import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { Tag } from 'antd';
import { format, parseISO } from 'date-fns';

import { fetchFavoriteArticle, fetchUnFavoriteArticle } from '../../serviceBlog/serviceBlog';

import classes from './Article.module.scss';
import heart from './heart.svg';
import heartred from './heartred.svg';
import avatar from './avatar.svg';

function Article({ slug, title, favoritesCount, tagList, description, createDate, author, body, favorited }) {
  const [favor, setFavor] = useState(favorited);
  const [favorCount, setFavorCount] = useState(favoritesCount);

  const user = useSelector((state) => state.blog.user);
  const userLogin = useSelector((state) => state.blog.userLogin);

  let date = format(parseISO(createDate), 'MMMM dd, yyyy');

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

  return (
    <li className={classes.Article}>
      <div className={classes['article__container']}>
        <div className={classes['article__info']}>
          <div>
            <Link
              to={`/articles/${slug}`}
              state={{
                title: title,
                slug: slug,
                tagList: tagList,
                description: description,
                date: date,
                author: author,
                body: body,
                favor: favor,
                favorCount: favorCount,
              }}
            >
              <h1 className={classes['article__title']}>{title}</h1>
            </Link>
            {favor ? (
              <>
                <img src={heartred} alt="like" onClick={delLike} />
                <span>{favorCount}</span>
              </>
            ) : (
              <>
                <img src={heart} alt="dislike" onClick={addLike} />
                <span>{favorCount}</span>
              </>
            )}
          </div>
          {tagList.map((item) => (
            <Tag style={{ backgroundColor: '#FFFFFF', marginTop: '5px' }} key={uuid()}>
              {item}
            </Tag>
          ))}
          <p style={{ marginTop: '5px', color: 'rgba(0, 0, 0, 0.75)' }}>{description}</p>
        </div>
        <div className={classes['article__info-user']}>
          <div className={classes['info-user__box1']}>
            <span className={classes['info-user__name']}>{author.username}</span>
            <span className={classes['info-user__date']}>{date}</span>
          </div>
          <div className={classes['info-user__box2']}>
            {author.image ? <img src={author.image} alt="avatar" /> : <img src={avatar} alt="avatar" />}
          </div>
        </div>
      </div>
    </li>
  );
}

export default Article;
