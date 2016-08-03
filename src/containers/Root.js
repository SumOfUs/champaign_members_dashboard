import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import AppRouter from './AppRouter/AppRouter';

export default function Root(props) {
  const { store, history } = props;
  return (
    <Provider store={store}>
      <AppRouter history={history} />
    </Provider>
  );
}

Root.propTypes = {
  store: PropTypes.object,
  history: PropTypes.object,
};
