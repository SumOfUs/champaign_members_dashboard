import { createStore, applyMiddleware, compose } from 'redux';
import { combineReducers } from 'redux-immutable';
import { routerMiddleware } from 'react-router-redux';
import { fromJS } from 'immutable';
import reducers from './reducers';

export default function configureStore(initialState = {}, history) {
  const middlewares = [
    routerMiddleware(history),
  ];

  const enhancers = [
    applyMiddleware(...middlewares),
  ];

  const reducer = combineReducers(reducers);

  if (DEBUG && window.devToolsExtension) {
    enhancers.push(window.devToolsExtension());
  }

  const store = createStore(reducer, fromJS(initialState), compose(...enhancers));

  return store;
}
