import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import config from 'app-config';
import { createStructuredSelector } from 'reselect';
import LoginForm from 'components/LoginForm/LoginForm';
import { SubmissionError } from 'redux-form/immutable';

import {
  selectLoading,
  selectError,
} from 'store/selectors';

import styles from './LoginPage.css';

export class LoginPage extends Component {
  onSubmit(credentials, dispatch) {
    console.log('hello creds:', credentials);
    // return dispatch({ type: 'LOGIN_REQUEST' });
    return axios
      .post(`${config.apiUrl}/api/stateless/auth/password`, { credentials })
      .then(success => {
        console.log(dispatch);
        return success;
      })
      .catch(error => {
        throw new SubmissionError(error);
      });
  }

  render() {
    return (
      <section id="login-page">
        <div className={styles.background}></div>
        <div className={`${styles.overlay} container`}>
          <h1 className={styles.title}>Login</h1>
          <LoginForm onSubmit={this.onSubmit} />
        </div>
      </section>
    );
  }
}

LoginPage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loading: selectLoading(),
  error: selectError(),
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
