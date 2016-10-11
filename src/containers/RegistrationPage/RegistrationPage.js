import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { SubmissionError, reduxForm } from 'redux-form/immutable';
import { isEmail, isLength } from 'validator';

import {
  selectRegistrationPageField,
  selectRegistrationPageMember,
  selectRegistrationPageSubmitting,
  selectRegistrationPageSuccess,
} from './RegistrationPage.selectors';
import { register } from './RegistrationPage.actions';
import RegistrationForm from './RegistrationForm';
import RegistrationSuccess from './RegistrationSuccess';
import SessionPageWrapper from '../../components/SessionPageWrapper/SessionPageWrapper';

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

  render() {
    const { submitting, submitSucceeded, valid } = this.props;
    return (
      <SessionPageWrapper>
        <section className="RegistrationPage-container">
          <h1 className="RegistrationPage-title">Registration</h1>
          { !submitSucceeded &&
            <RegistrationForm
              error={this.props.error}
              fields={this.fields}
              onSubmit={this.props.handleSubmit(this.onSubmit.bind(this)).bind(this)}
              submitting={submitting}
              success={submitSucceeded}
              valid={valid}
            />
          }

          { submitSucceeded && <RegistrationSuccess email={this.props.member.get('email')}/>}
        </section>
      </SessionPageWrapper>
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
  error: selectRegistrationPageField('error'),
  errors: selectRegistrationPageField('errors'),
  member: selectRegistrationPageMember(),
  submitting: selectRegistrationPageSubmitting(),
  success: selectRegistrationPageSuccess(),
});

export default reduxForm({ form: 'registration', validate })(
  connect(mapStateToProps)(RegistrationPage)
);
