import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';
import { Field, SubmissionError, reduxForm } from 'redux-form/immutable';
import {
  Alert,
  Button,
  Checkbox,
  ControlLabel,
  FormControl,
  FormGroup,
} from 'react-bootstrap';
import { FieldComponent } from 'components/FormComponents/FieldComponent';
import { LoadingOverlay } from 'components/LoadingOverlay/LoadingOverlay';

import {
  selectAuthToken,
  selectCurrentMember,
} from 'store/selectors';

import { login } from './actions';
import validate from './validate';
import styles from './LoginPage.css';

function errorHandler(response) {
  switch(response.status) {
    case 401:
    case 400:
      return 'Invalid user or password';
    case 0:
    default:
      return 'There was an error with the server';
  }
}

export class LoginPage extends Component {
  componentWillMount() {
    return this.redirectIfAuthenticated();
  }

  componentWillUpdate() {
    return this.redirectIfAuthenticated();
  }

  onSubmit(data, dispatch) {
    const credentials = data.toJS();
    return dispatch(login(credentials))
      .catch(error => {
        // handle response errors in a neater way
        console.log(error.response.status);
        const message = errorHandler(error.response);
        throw new SubmissionError({ _error: message });
      });
  }

  redirectIfAuthenticated() {
    if (this.props.token && this.props.member) {
      this.props.redirect('/');
    }
  }

  submitFailedMessage() {
    return (
      <Alert bsStyle="danger">
        <p>{this.props.error}</p>
      </Alert>
    );
  }

  render() {
    const {
      token,
      member,
      handleSubmit,
      submitting,
      submitFailed,
    } = this.props;

    if (token && member) {
      return (null);
    }

    return (
      <section id="login-page">
        <div className={styles.background}></div>
        <div className={`${styles.overlay} container`}>
          <h1 className={styles.title}>Login</h1>
          <form onSubmit={handleSubmit(this.onSubmit)} className={styles.form}>

            <LoadingOverlay enabled={submitting} />

            {submitFailed ? this.submitFailedMessage() : null}

            <FormGroup controlId="loginEmail">
              <ControlLabel>Email</ControlLabel>
              <Field
                name="email"
                type="text"
                component={FieldComponent}
                disabled={submitting}
              />
            </FormGroup>

            <FormGroup controlId="loginPassword">
              <ControlLabel>Password</ControlLabel>
              <Field
                name="password"
                type="password"
                component={FieldComponent}
                disabled={submitting}
              />
              <FormControl.Feedback />
            </FormGroup>

            <Checkbox>Remember me</Checkbox>

            <Button type="submit" disabled={submitting}>Log in</Button>
          </form>
        </div>
      </section>
    );
  }
}

LoginPage.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  redirect: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  submitFailed: PropTypes.bool.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.string,
  token: PropTypes.string,
  member: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  token: selectAuthToken(),
  member: selectCurrentMember(),
});

const mapDispatchToProps = dispatch => ({
  redirect: url => dispatch(push(url)),
  dispatch,
});

export default reduxForm({ form: 'login', validate })(
  connect(mapStateToProps, mapDispatchToProps)(LoginPage)
);
