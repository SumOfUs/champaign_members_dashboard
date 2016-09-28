import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import App from '../App';
import RequireAuthentication from '../RequireAuthentication';
import HomePage from '../HomePage/HomePage';
import LoginPage from '../LoginPage/LoginPage';
import SubscriptionsPage from '../SubscriptionsPage/SubscriptionsPage';
import PaymentMethodsPage from '../PaymentMethodsPage/PaymentMethodsPage';

export const AppRouter = (props) => (
  <Router history={props.history} render={props.render}>
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
);

console.log(SubscriptionsPage);

AppRouter.propTypes = {
  history: PropTypes.object,
  render: PropTypes.func,
};

export default AppRouter;
