import React, { PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import FieldComponent from '../../components/Forms/FieldComponent';
import ErrorMessage from '../../components/ErrorMessage';
import { Field } from 'redux-form/immutable';


export default function RegistrationForm(props) {

  const {
    error,
    fields,
    onSubmit,
    submitting,
    valid,
  } = props;

  const disableSubmit = submitting || !valid;

  return (
    <div id="registration-form">
      <form className="RegistrationPage-form form-big" onSubmit={onSubmit}>
        <ErrorMessage message={error} />
        {fields.map(field =>
          <Field
            {...field}
            component={FieldComponent}
            key={field.name}
            disabled={submitting}
          />)}

      <Button type="submit" disabled={disableSubmit}>
        {!submitting ? 'Register' : 'Registering...'}
      </Button>
      </form>
    </div>
  );
}

RegistrationForm.propTypes = {
  error: PropTypes.object,
  fields: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  valid: PropTypes.bool.isRequired,
};
