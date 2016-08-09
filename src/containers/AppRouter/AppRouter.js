import React, { PropTypes } from 'react';
import { createStructuredSelector } from 'reselect';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { Router, Route } from 'react-router';

import App from 'containers/App';
import RequireAuthentication from 'containers/RequireAuthentication';
import HomePage from 'containers/HomePage/HomePage';
import LoginPage from 'containers/LoginPage/LoginPage';

import {
  selectCurrentMember,
  selectAuthToken,
} from '../../store/selectors';

export const AppRouter = (props) => (
  <Router history={props.history} render={props.render}>
    <Route component={App}>
      <Route path="/login" name="login" component={LoginPage} />
      <Route component={RequireAuthentication}>
        <Route path="/" name="home" component={HomePage} />
      </Route>
    </Route>
  </Router>
);

AppRouter.propTypes = {
  history: PropTypes.object,
  render: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  token: selectAuthToken(),
  member: selectCurrentMember(),
});

const mapDispatchToProps = dispatch => ({
  redirectTo: url => dispatch(push(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter);
