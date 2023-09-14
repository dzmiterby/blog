import React, { useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { Space, Spin, Alert, ConfigProvider, Pagination, Empty } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import Article from '../Article/Article';
import { fetchGetListArticles } from '../../serviceBlog/serviceBlog';
import { changeOffset } from '../../store/storeblog';

import classes from './ArticleList.module.scss';

function ArticleList() {
  const dispatch = useDispatch();

  const articles = useSelector((state) => state.blog.articles);
  const user = useSelector((state) => state.blog.user);
  const userLogin = useSelector((state) => state.blog.userLogin);
  const isLoaded = useSelector((state) => state.blog.isLoaded);
  const error = useSelector((state) => state.blog.error);
  const noResult = useSelector((state) => state.blog.noResult);
  const offset = useSelector((state) => state.blog.offset);
  const totalArticles = useSelector((state) => state.blog.totalArticles);

  let page = 1;
  if (offset === 0) {
    page = 1;
  } else {
    page = offset / 20 + 1;
  }

  function switchPage(e) {
    dispatch(changeOffset((e - 1) * 20));
    fetchGetListArticles(dispatch, (e - 1) * 20);
  }

  useEffect(() => {
    if (userLogin) {
      fetchGetListArticles(dispatch, offset, user.token);
    } else {
      fetchGetListArticles(dispatch, offset);
    }
  }, [dispatch, offset, userLogin, user.token]);

  return (
    <div className={classes.ArticleList}>
      {isLoaded && (
        <Space direction="vertical" style={{ width: '100%', margin: '70px 0 50px' }}>
          <Spin size="large">
            <div className="content" />
          </Spin>
        </Space>
      )}
      {error && (
        <Space direction="vertical" style={{ width: '100%', marginTop: '20px' }}>
          <Alert
            style={{ width: '50%', margin: '0 auto' }}
            message="Ошибка"
            description="Что-то пошло не так..."
            type="error"
            showIcon
          />
        </Space>
      )}
      {noResult && <Empty style={{ marginTop: '20px' }} />}
      {!isLoaded && !error && !noResult && (
        <>
          <ul className={classes['articleList__container']}>
            {articles.map((item) => (
              <Article
                key={uuid()}
                slug={item.slug}
                title={item.title}
                favoritesCount={item.favoritesCount}
                tagList={item.tagList}
                description={item.description}
                author={item.author}
                createDate={item.createdAt}
                updateDate={item.updatedAt}
                body={item.body}
                favorited={item.favorited}
              />
            ))}
          </ul>
          <ConfigProvider
            theme={{
              token: {
                colorBgContainer: '#1890FF',
                colorPrimary: '#FFFFFF',
                fontSize: 12,
              },
            }}
          >
            <Pagination
              style={{ textAlign: 'center', padding: '20px 0' }}
              defaultCurrent={page}
              total={totalArticles}
              pageSize="20"
              onChange={switchPage}
            />
          </ConfigProvider>
        </>
      )}
    </div>
  );
}

export default ArticleList;
