import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { push } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';
import { Field, SubmissionError, reduxForm } from 'redux-form/immutable';
import { Alert, Button, Checkbox } from 'react-bootstrap';
import { FieldComponent } from '../../components/Forms/FieldComponent';
import { LoadingOverlay } from '../../components/LoadingOverlay/LoadingOverlay';
import SessionPageWrapper from '../../components/SessionPageWrapper/SessionPageWrapper';

import {
  selectAuthToken,
  selectCurrentMember,
} from '../../store/selectors';

import { login } from './actions';
import validate from './validate';
import './LoginPage.css';

function errorHandler(response) {
  switch (response.status) {
    case 401:
    case 400:
      return 'Invalid email or password';
    case 0:
    default:
      return 'There was an error with the server';
  }
}

export class LoginPage extends Component {
  static propTypes = {
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
        const message = errorHandler(error);
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
      <SessionPageWrapper>
        <div id="LoginPage" className="LoginPage-container">
          <form onSubmit={handleSubmit(this.onSubmit)} className="LoginPage-form form-big">
            <h2 className="LoginPage-title">Login</h2>
            <LoadingOverlay enabled={submitting} />
            {submitFailed ? this.submitFailedMessage() : null}
            <Field
              name="email"
              type="text"
              placeholder="Email"
              component={FieldComponent}
              disabled={submitting}
            />

            <Field
              name="password"
              type="password"
              placeholder="Password"
              component={FieldComponent}
              disabled={submitting}
            />

            <Checkbox>Remember me</Checkbox>

            <Button type="submit" disabled={submitting}>Log in</Button> or <Link to="/register">Register</Link>
          </form>
        </div>
      </SessionPageWrapper>
    );
  }
}

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
