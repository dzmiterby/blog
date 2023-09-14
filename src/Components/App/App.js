import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from '../Header/Header';
import ArticleList from '../ArticleList/ArticleList';
import ArticleView from '../ArticleView/ArticleView';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import Profile from '../Profile/Profile';
import NewArticle from '../NewArticle/NewArticle';
import EditArticle from '../EditArticle/EditArticle';
import Page404 from '../Page404/Page404';

import classes from './App.module.scss';

function App() {
  return (
    <div className={classes.App}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" exact element={<ArticleList />} />
          <Route path="/articles" exact element={<ArticleList />} />
          <Route path="/articles/:slug" element={<ArticleView />} />
          <Route path="/sign-in" exact element={<SignIn />} />
          <Route path="/sign-up" exact element={<SignUp />} />
          <Route path="/new-article" exact element={<NewArticle />} />
          <Route path="/articles/:slug/edit" exact element={<EditArticle />} />
          <Route path="/profile" exact element={<Profile />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
