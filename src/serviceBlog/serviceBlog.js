import {
  addArticles,
  changeTotalArticles,
  changeIsLoaded,
  changeError,
  changeNoResult,
  setUser,
  setUserError,
  changeUserLogin,
  setUpdateError,
  changeCreateNewArticleStatus,
  changeUpdateArticleStatus,
} from '../store/storeblog';

const baseUrl = 'https://blog.kata.academy/api/';

// Получение списка статей
export const fetchGetListArticles = async (dispatch, offset = 0, key = '') => {
  dispatch(changeIsLoaded(true));
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${key}`,
    },
  };
  fetch(`${baseUrl}articles?limit=20&offset=${offset}`, options)
    .then((response) => response.json())
    .then((result) => {
      dispatch(changeIsLoaded(false));
      dispatch(changeTotalArticles(result.articlesCount));
      dispatch(addArticles(result.articles));
      if (result.articles.length === 0) dispatch(changeNoResult(true));
    })
    .catch((error) => {
      dispatch(changeIsLoaded(false));
      dispatch(changeError(error));
    });
};

// Создание нового аккаунта
export const fetchCreateNewAccount = async (dispatch, data) => {
  dispatch(changeIsLoaded(true));
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: data,
  };
  fetch(`${baseUrl}users`, options)
    .then((response) => response.json())
    .then((result) => {
      if (result.user) {
        dispatch(setUser(result.user));
        dispatch(setUserError(null));
      }
      if (result.errors) {
        dispatch(setUser(false));
        dispatch(setUserError(result.errors));
      }
      dispatch(changeIsLoaded(false));
    })
    .catch((error) => {
      dispatch(changeIsLoaded(false));
      console.log(error.message);
    });
};

// Вход в аккаунт
export const fetchInterAccount = async (dispatch, data) => {
  dispatch(changeIsLoaded(true));
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: data,
  };
  fetch(`${baseUrl}users/login`, options)
    .then((response) => response.json())
    .then((result) => {
      if (result.user) {
        dispatch(setUser(result.user));
        dispatch(changeUserLogin(true));
        dispatch(setUserError(null));
      }
      if (result.errors) {
        dispatch(setUser(false));
        dispatch(setUserError(result.errors));
      }
      dispatch(changeIsLoaded(false));
    })
    .catch((error) => {
      dispatch(changeIsLoaded(false));
      console.log(error.message);
    });
};

// Получение текщего пользователя
export const fetchGetCurrentUser = async (dispatch, key) => {
  dispatch(changeIsLoaded(true));
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${key}`,
    },
  };
  fetch(`${baseUrl}user`, options)
    .then((response) => response.json())
    .then((result) => {
      dispatch(changeIsLoaded(false));
      if (result.user) {
        dispatch(setUser(result.user));
        dispatch(changeUserLogin(true));
        dispatch(setUserError(null));
      }
      if (result.errors) {
        dispatch(setUserError(result.errors));
        dispatch(setUser(false));
        dispatch(changeUserLogin(false));
      }
      dispatch(changeIsLoaded(false));
    })
    .catch((error) => {
      dispatch(changeIsLoaded(false));
      console.log(error.message);
    });
};

// Обновление текущего пользователя
export const fetchUpdateCurrentUser = async (dispatch, key, data) => {
  dispatch(changeIsLoaded(true));
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key}`,
    },
    body: data,
  };
  fetch(`${baseUrl}user`, options)
    .then((response) => response.json())
    .then((result) => {
      dispatch(changeIsLoaded(false));
      if (result.user) {
        dispatch(setUser(result.user));
        dispatch(setUpdateError(null));
      }
      if (result.errors) {
        dispatch(setUpdateError(result.errors));
      }
      dispatch(changeIsLoaded(false));
    })
    .catch((error) => {
      dispatch(changeIsLoaded(false));
      console.log(error.message);
    });
};

// Создание статьи
export const fetchCreateArticle = async (dispatch, key, data) => {
  dispatch(changeIsLoaded(true));
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key}`,
    },
    body: data,
  };
  fetch(`${baseUrl}articles`, options)
    .then((response) => response.json())
    .then(() => {
      dispatch(changeIsLoaded(false));
      dispatch(changeCreateNewArticleStatus(true));
    })
    .catch((error) => {
      dispatch(changeIsLoaded(false));
      console.log(error.message);
    });
};

// Удаление статьи
export const fetchDelArticle = async (key, slug) => {
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key}`,
    },
  };
  fetch(`${baseUrl}articles/${slug}`, options).catch((error) => {
    console.log(error.message);
  });
};

// Обновление статьи
export const fetchUpdateArticle = async (dispatch, key, data, slug) => {
  dispatch(changeIsLoaded(true));
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key}`,
    },
    body: data,
  };
  fetch(`${baseUrl}articles/${slug}`, options)
    .then((response) => response.json())
    .then(() => {
      dispatch(changeIsLoaded(false));
      dispatch(changeUpdateArticleStatus(true));
    })
    .catch((error) => {
      dispatch(changeIsLoaded(false));
      console.log(error.message);
    });
};

// Добавление статьи в избранные
export const fetchFavoriteArticle = async (key, slug) => {
  const options = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
    },
  };
  fetch(`${baseUrl}articles/${slug}/favorite`, options)
    .then((response) => response.json())
    .catch((error) => {
      console.log(error.message);
    });
};

// Удаление статьи из избранных
export const fetchUnFavoriteArticle = async (key, slug) => {
  const options = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${key}`,
    },
  };
  fetch(`${baseUrl}articles/${slug}/favorite`, options)
    .then((response) => response.json())
    .catch((error) => {
      console.log(error.message);
    });
};
