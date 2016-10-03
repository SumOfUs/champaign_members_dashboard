import React, { PropTypes } from 'react';
import {
  ControlLabel,
  FormControl,
  FormGroup,
} from 'react-bootstrap';
import { FieldComponent } from './FieldComponent';
import { Field } from 'redux-form/immutable';
import { SimpleSelect } from 'react-selectize';
import 'react-selectize/dist/index.css';

const SelectComponent = props => {
  const { disabled, placeholder, options, input: { value, onChange } } = props;
  return (
    <SimpleSelect
      placeholder={placeholder}
      value={value}
      options={options}
      disabled={disabled}
      theme="bootstrap3"
      onValueChange={onChange}
      onBlur={() => true}
      onChange={() => true}
    />
  );
};

const FormField = props => {
  const { id, name, type, disabled, title } = props;

  let component = FieldComponent;

  if (type === 'select') {
    component = SelectComponent;
  }

  return (
    <FormGroup controlId={name}>
      <ControlLabel>{title}</ControlLabel>
      <Field
        name={name}
        type={type}
        component={component}
        options={props.options}
        placeholder={props.placeholder}
        disabled={disabled}
      />
      <FormControl.Feedback />
    </FormGroup>
  );
};

FormField.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

export default FormField;
