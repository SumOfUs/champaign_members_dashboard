import React, { PropTypes, Component } from 'react';
import { Button } from 'react-bootstrap';
import FieldComponent from '../../components/Forms/FieldComponent';
import ErrorMessage from '../../components/ErrorMessage';
import { Field } from 'redux-form/immutable';
import {defineMessages, injectIntl} from 'react-intl';


export class RegistrationForm extends Component {
  static propTypes = {
    error: PropTypes.object,
    fields: PropTypes.array.isRequired,
    onSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    valid: PropTypes.bool.isRequired,
  };

  render(){
    const {
      error,
      fields,
      onSubmit,
      submitting,
      valid,
    } = this.props;

  const disableSubmit = submitting || !valid;

  const {formatMessage} = this.props.intl;

  const i18n = defineMessages({
    email: {
      id: 'form.email',
    },
    password: {
      id: 'form.password',
    },
    password_confirmation: {
      id: 'form.password_confirmation',
    },
    login: {
      id: 'login.login',
    },
    register: {
      id: 'registration.register',
    },
    registering: {
      id: 'registration.registering',
    },
  });

  return (
    <div id="registration-form">
      <form className="RegistrationPage-form form-big" onSubmit={onSubmit}>
        <ErrorMessage message={error} />
        {fields.map(field =>

          <Field
            {...field}
            placeholder={formatMessage(i18n[field.name])}
            component={FieldComponent}
            key={field.name}
            disabled={submitting}
          />)}

      <Button type="submit" disabled={disableSubmit}>
        {!submitting ? formatMessage(i18n.register) : formatMessage(i18n.registering)}
      </Button>
      </form>
    </div>
   )
  }
};

export default injectIntl(RegistrationForm);
