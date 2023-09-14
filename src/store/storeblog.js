const defaultState = {
  articles: [],
  offset: 0,
  totalArticles: 0,
  isLoaded: false,
  error: null,
  noResult: false,
  user: false,
  userError: null,
  userLogin: false,
  updatedError: null,
  createNewArticleStatus: false,
  updateArticleStatus: false,
};

const ADD_ARTICLES = 'ADD_ARTICLES';
const CHANGE_OFFSET = 'CHANGE_OFFSET';
const CHANGE_TOTAL_ARTICLES = 'CHANGE_TOTAL_ARTICLES';
const CHANGE_IS_LOADED = 'CHANGE_IS_LOADED';
const CHANGE_ERROR = 'CHANGE_ERROR';
const CHANGE_NO_RESULT = 'CHANGE_NO_RESULT';
const SET_USER = 'SET_USER';
const SET_USER_ERROR = 'SET_USER_ERROR';
const CHANGE_USER_LOGIN = 'CHANGE_USER_LOGIN';
const SET_UPDATE_ERROR = 'SET_UPDATE_ERROR';
const CHANGE_CREATE_NEW_ARTICLE_STATUS = 'CHANGE_CREATE_NEW_ARTICLE_STATUS';
const CHANGE_UPDATE_ARTICLE_STATUS = 'CHANGE_UPDATE_ARTICLE_STATUS';

export const blogReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_ARTICLES:
      return {
        ...state,
        articles: [...action.payload],
      };
    case CHANGE_OFFSET:
      return {
        ...state,
        offset: action.payload,
      };
    case CHANGE_IS_LOADED:
      return {
        ...state,
        isLoaded: action.payload,
      };
    case CHANGE_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case CHANGE_NO_RESULT:
      return {
        ...state,
        noResult: action.payload,
      };
    case CHANGE_TOTAL_ARTICLES:
      return {
        ...state,
        totalArticles: action.payload,
      };
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case SET_USER_ERROR:
      return {
        ...state,
        userError: action.payload,
      };
    case CHANGE_USER_LOGIN:
      return {
        ...state,
        userLogin: action.payload,
      };
    case SET_UPDATE_ERROR:
      return {
        ...state,
        updatedError: action.payload,
      };
    case CHANGE_CREATE_NEW_ARTICLE_STATUS:
      return {
        ...state,
        createNewArticleStatus: action.payload,
      };
    case CHANGE_UPDATE_ARTICLE_STATUS:
      return {
        ...state,
        updateArticleStatus: action.payload,
      };
    default:
      return state;
  }
};

export const addArticles = (payload) => ({ type: ADD_ARTICLES, payload });
export const changeOffset = (payload) => ({ type: CHANGE_OFFSET, payload });
export const changeTotalArticles = (payload) => ({ type: CHANGE_TOTAL_ARTICLES, payload });
export const changeIsLoaded = (payload) => ({ type: CHANGE_IS_LOADED, payload });
export const changeError = (payload) => ({ type: CHANGE_ERROR, payload });
export const changeNoResult = (payload) => ({ type: CHANGE_NO_RESULT, payload });
export const setUser = (payload) => ({ type: SET_USER, payload });
export const setUserError = (payload) => ({ type: SET_USER_ERROR, payload });
export const changeUserLogin = (payload) => ({ type: CHANGE_USER_LOGIN, payload });
export const setUpdateError = (payload) => ({ type: SET_UPDATE_ERROR, payload });
export const changeCreateNewArticleStatus = (payload) => ({ type: CHANGE_CREATE_NEW_ARTICLE_STATUS, payload });
export const changeUpdateArticleStatus = (payload) => ({ type: CHANGE_UPDATE_ARTICLE_STATUS, payload });
