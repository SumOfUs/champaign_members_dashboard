import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { SubmissionError, reduxForm } from 'redux-form/immutable';
import { isEmail, isLength } from 'validator';

import {
  selectRegistrationPageErrors,
  selectRegistrationPageMember,
  selectRegistrationPageSubmitting,
  selectRegistrationPageSuccess,
} from './RegistrationPage.selectors';
import { register } from './RegistrationPage.actions';
import RegistrationForm from './RegistrationForm';
import RegistrationSuccess from './RegistrationSuccess';

import countries from './countries.json';

import './RegistrationPage.css';

export class RegistrationPage extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    submitFailed: PropTypes.bool.isRequired,
    loading: PropTypes.bool,
    error: PropTypes.string,
  };

  fields = [{
    name: 'email',
    title: 'Email',
    type: 'text',
  }, {
    name: 'password',
    title: 'Password',
    type: 'password',
  }, {
    name: 'password_confirmation',
    title: 'Password confirmation',
    type: 'password',
  }];

  onSubmit(data, dispatch) {
    const registrationData = data.toJS();

    return dispatch(register({ member: registrationData }))
      .catch(errors => {
        throw new SubmissionError(errors);
      });
  }

  getFieldError(field) {
    if (!this.props.errors) {
      return null;
    }
    const error = this.props.errors.get(field.name);

    if (!error) {
      return null;
    }

    return error.first();
  }

  render() {
    const { submitting, submitSucceeded, submitFailed, valid } = this.props;
    return (
      <section id="login-page">
        <div className="RegistrationPage-background" />
        <div className="RegistrationPage-overlay container">
          <h1 className="RegistrationPage-title">Registration</h1>
          { !submitting && !submitSucceeded &&
            <RegistrationForm
              error={this.props.error}
              fields={this.fields}
              onSubmit={this.props.handleSubmit(this.onSubmit)}
              submitting={submitting}
              success={submitSucceeded}
              valid={valid}
            />
          }

          { submitSucceeded && <RegistrationSuccess email={this.props.member.get('email')}/>}
        </div>
      </section>
    );
  }
}

function validate(values) {
  const ERRORS = {
    REQUIRED: 'Required',
    EMAIL_REGEX: 'Invalid email address',
    PASSWORD_LENGTH: 'Must be 6 or more characters in length',
    PASSWORD_CONFIRMATION: `Passwords don't match`,
  };

  values = values.toJS();

  const errors = {};

  if (!values.name) {
    errors.name = ERRORS.REQUIRED;
  }

  if (!values.email) {
    errors.email = ERRORS.REQUIRED;
  } else if (!isEmail(values.email)) {
    errors.email = ERRORS.EMAIL_REGEX;
  }

  if (!values.country) {
    errors.country = ERRORS.REQUIRED;
  }

  if (!values.password) {
    errors.password = ERRORS.REQUIRED;
  } else if (!isLength(values.password, { min: 6 })) {
    errors.password = ERRORS.PASSWORD_LENGTH;
  }

  if (!values.password_confirmation || values.password_confirmation !== values.password) {
    errors.password_confirmation = ERRORS.PASSWORD_CONFIRMATION;
  }

  return errors;
}

const mapStateToProps = createStructuredSelector({
  errors: selectRegistrationPageErrors(),
  member: selectRegistrationPageMember(),
  submitting: selectRegistrationPageSubmitting(),
  success: selectRegistrationPageSuccess(),
});

export default reduxForm({ form: 'registration', validate })(
  connect(mapStateToProps)(RegistrationPage)
);
