import { createStore, applyMiddleware, compose } from 'redux';
import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

const middleware = [
  applyMiddleware(
    routerMiddleware(browserHistory),
    thunk,
  ),
];

function configureStore(initialState = {}) {
  const combinedReducer = combineReducers(reducers);

  if (window.devToolsExtension) {
    middleware.push(window.devToolsExtension());
  }

  return createStore(combinedReducer, fromJS(initialState), compose(...middleware));
}

export const history = browserHistory;
export default configureStore;
