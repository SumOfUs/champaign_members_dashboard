import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { IndexRoute, Router, Route } from 'react-router';

import App from './components/App/App';
import RequireAuthentication from './containers/RequireAuthentication';
import HomePage from './containers/HomePage/HomePage';
import LoginPage from './containers/LoginPage/LoginPage';
import SubscriptionsPage from './containers/SubscriptionsPage/SubscriptionsPage';
import PaymentMethodsPage from './containers/PaymentMethodsPage/PaymentMethodsPage';


export function Root(props) {
  const { store, history, render } = props;
  return (
    <Provider store={store}>
      <Router history={history} render={render}>
        <Route component={App}>
          <Route path="/login" name="login" component={LoginPage} />
          <Route component={RequireAuthentication}>
            <Route path="/" name="home" component={HomePage}>
            <IndexRoute component={SubscriptionsPage} />
            <Route path="subscriptions" name="subscriptions" component={SubscriptionsPage} />
            <Route path="payment-methods" name="payments" component={PaymentMethodsPage} />
            </Route>
          </Route>
        </Route>
      </Router>
    </Provider>
  );
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object,
  render: PropTypes.func,
};

export default Root;
