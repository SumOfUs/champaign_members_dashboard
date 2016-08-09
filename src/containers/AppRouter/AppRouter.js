import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import App from 'containers/App';
import RequireAuthentication from 'containers/RequireAuthentication';
import HomePage from 'containers/HomePage/HomePage';
import LoginPage from 'containers/LoginPage/LoginPage';
import SubscriptionsPage from 'containers/SubscriptionsPage/SubscriptionsPage';

export const AppRouter = (props) => (
  <Router history={props.history} render={props.render}>
    <Route component={App}>
      <Route path="/login" name="login" component={LoginPage} />
      <Route component={RequireAuthentication}>
        <Route path="/" name="home" component={HomePage}>
          <IndexRoute component={SubscriptionsPage} />
          <Route path="subscriptions" name="subscriptions" component={SubscriptionsPage} />
        </Route>
      </Route>
    </Route>
  </Router>
);

AppRouter.propTypes = {
  history: PropTypes.object,
  render: PropTypes.func,
};

export default AppRouter;
