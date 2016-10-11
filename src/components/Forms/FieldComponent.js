import React, { PropTypes } from 'react';
import { SimpleSelect } from 'react-selectize';
import {
  ControlLabel,
  FormControl,
  FormGroup,
} from 'react-bootstrap';
import FieldErrorMessage from './FieldErrorMessage';

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
    />
  );
};


export const FieldComponent = (props) => {
  const { error, name, type, title } = props;
  const { meta } = props;

  let validationState = null;

  if (meta.touched && meta.error) {
    validationState = 'error';
  } else if (meta.touched) {
    validationState = 'success';
  }

  return (
    <FormGroup controlId={name} validationState={validationState}>
      { title && <ControlLabel>{title}</ControlLabel> }
      { error && <FieldErrorMessage message={error} /> }
      { type === 'select' && <SelectComponent {...props} /> }
      { type !== 'select' &&
        <FormControl
          type={props.type}
          disabled={props.disabled}
          placeholder={props.placeholder}
          {...props.input}
        />
      }
      { props.meta.touched
        && props.meta.error
        && <em className="text-danger">{props.meta.error}</em> }
    </FormGroup>
  );
};

FieldComponent.propTypes = {
  error: PropTypes.string,
  input: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

export default FieldComponent;
