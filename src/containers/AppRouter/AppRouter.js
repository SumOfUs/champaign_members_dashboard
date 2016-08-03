import React, { Component } from 'react';
import { createStructuredSelector } from 'reselect';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { Router, Route } from 'react-router';

import App from 'containers/App';
import HomePage from 'containers/HomePage';
import LoginPage from 'containers/LoginPage';

import {
  selectCurrentMember,
} from '../../store/selectors';

export class AppRouter extends Component {
  authenticateUser = (nextState, replace) => {
    if (!this.props.member) {
      replace('/login');
    }
  }

  render() {
    return (
      <Router history={this.props.history} render={this.props.render}>
        <Route component={App}>
          <Route path="/login" name="login" component={LoginPage} />
          <Route
            path="/"
            name="home"
            onEnter={this.authenticateUser}
            component={HomePage}
          />
        </Route>
      </Router>
    );
  }
}

AppRouter.propTypes = {
  member: React.PropTypes.object,
  history: React.PropTypes.object,
  render: React.PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  member: selectCurrentMember(),
});

const mapDispatchToProps = dispatch => ({
  redirectTo: url => dispatch(push(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter);
