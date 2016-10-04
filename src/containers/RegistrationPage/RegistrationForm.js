import React, { PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import FieldComponent from '../../components/Forms/FieldComponent';
import ErrorMessage from '../../components/ErrorMessage';
import { LoadingOverlay } from '../../components/LoadingOverlay/LoadingOverlay';
import { Field } from 'redux-form/immutable';


export default function RegistrationForm(props) {

  const {
    error,
    fields,
    onSubmit,
    submitting,
    success,
    valid,
  } = props;

  return (
    <div id="registration-form">
      <ErrorMessage message={error} />
      <form className="RegistrationPage-form" onSubmit={onSubmit}>
        <LoadingOverlay enabled={submitting} />
        {fields.map(field =>
          <Field
            {...field}
            component={FieldComponent}
            key={field.name}
            disabled={submitting}
          />)}

        <Button type="submit" disabled={submitting || success || !valid }>Join SumOfUs</Button>
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
