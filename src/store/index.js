import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';

import { blogReducer } from './storeblog';

const rootReducer = combineReducers({
  blog: blogReducer,
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
