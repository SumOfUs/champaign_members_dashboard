import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { reduxForm } from 'redux-form/immutable';
import { Button } from 'react-bootstrap';
import FormField from '../../components/Forms/FormField';
import ErrorMessage from '../../components/ErrorMessage';
import { LoadingOverlay } from '../../components/LoadingOverlay/LoadingOverlay';
import { selectAuthToken, selectCurrentMember } from '../../store/selectors';
import './RegistrationPage.css';
import countries from './countries.json';

import { register } from './RegistrationPage.actions';

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
    name: 'full_name',
    title: 'Full Name',
    type: 'text',
  }, {
    name: 'email',
    title: 'Email',
    type: 'text',
  }, {
    name: 'country',
    title: 'Country',
    type: 'select',
    placeholder: 'Select a country',
    options: countries.map(c => ({ value: c.code, label: c.name })),
  }, {
    name: 'post_code',
    title: 'Post code',
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
    console.log('formData', registrationData);

    return dispatch(register(registrationData))
      .catch(e => console.log('Error', e));

  }

  render() {
    const submitting = false;
    return (
      <section id="login-page">
        <div className="RegistrationPage-background" />
        <div className="RegistrationPage-overlay container">
          <h1 className="RegistrationPage-title">Registration</h1>
          <form className="RegistrationPage-form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
            <LoadingOverlay enabled={submitting} />

            <ErrorMessage message={this.props.error} />

            {this.fields.map(field => <FormField key={field.name} {...field} disabled={submitting} />)}

            <Button type="submit" disabled={submitting}>Join SumOfUs</Button>
          </form>
        </div>
      </section>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  token: selectAuthToken(),
  member: selectCurrentMember(),
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default reduxForm({ form: 'registration' })(
  connect(mapStateToProps, mapDispatchToProps)(RegistrationPage)
);
