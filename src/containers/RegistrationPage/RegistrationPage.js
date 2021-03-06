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

import { selectLocale } from '../../store/selectors';
import { register } from './RegistrationPage.actions';
import RegistrationForm from './RegistrationForm';
import RegistrationSuccess from './RegistrationSuccess';
import SessionPageWrapper from '../../components/SessionPageWrapper/SessionPageWrapper';
import {FormattedMessage} from 'react-intl';


import './RegistrationPage.css';

const validate = (values) => {
  const ERRORS = {
    REQUIRED: <FormattedMessage id="registration.required" />,
    EMAIL_REGEX:  <FormattedMessage id="registration.invalid_email" />,
    PASSWORD_LENGTH:   <FormattedMessage id="registration.password_length" />,
    PASSWORD_CONFIRMATION:  <FormattedMessage id="registration.password_mismatch" />,
  };

  values = values.toJS();

  const errors = {};

  if (!values.email) {
    errors.email = ERRORS.REQUIRED;
  } else if (!isEmail(values.email)) {
    errors.email = ERRORS.EMAIL_REGEX;
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
    placeholder: 'Email',
    type: 'text',
  }, {
    name: 'password',
    placeholder: 'Password',
    type: 'password',
  }, {
    name: 'password_confirmation',
    placeholder: 'Password confirmation',
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
          <h1 className="RegistrationPage-title">
            <FormattedMessage id="registration.register" />
          </h1>
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

const mapStateToProps = createStructuredSelector({
  error: selectRegistrationPageField('error'),
  errors: selectRegistrationPageField('errors'),
  member: selectRegistrationPageMember(),
  submitting: selectRegistrationPageSubmitting(),
  success: selectRegistrationPageSuccess(),
  locale: selectLocale(),
});


const ReduxFormRegistrationPage = reduxForm({ form: 'registration', validate })(RegistrationPage);

export default connect(mapStateToProps)(ReduxFormRegistrationPage);
