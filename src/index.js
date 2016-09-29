import React from 'react';
import ReactDOM from 'react-dom';
import { syncHistoryWithStore } from 'react-router-redux';

import Root from "./Root";
import { selectLocationState } from './store/selectors';
import {
  default as configureStore,
  history as browserHistory,
} from './store';

// Import Bootstrap css & theme (globally)
import 'sanitize.css/sanitize.css';
import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

// setup redux store
const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: selectLocationState(),
});

ReactDOM.render(
  <Root store={store} history={history} />,
  document.getElementById('root')
);
