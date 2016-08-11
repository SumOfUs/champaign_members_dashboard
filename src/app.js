import 'font-awesome/css/font-awesome.css';

import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import Root from './containers/Root';
import configureStore from './store/store';
import { selectLocationState } from './store/selectors';

const initialState = {};
const element = document.getElementById('root');

// configure redux store, and sync browser history (html5)
// with redux store (optional)
const store = configureStore(initialState, browserHistory);
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: selectLocationState(),
});

// Render our app in `mountPoint` (div#root). The AppContainer
// component is for react-hot-loader. In production builds it's
// an empty wrapper.

const errorReporter = ({ error }) => { throw error; };

render(
  <AppContainer errorReporter={errorReporter}>
    <Root store={store} history={history} />
  </AppContainer>,
  element
);

// For react-hot-loader / hmr. Production builds will ignore this block.
if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const NewRoot = require('./containers/Root').default;
    render(
      <AppContainer errorReporter={errorReporter}>
        <NewRoot store={store} history={history} />
      </AppContainer>,
      element
    );
  });
}
