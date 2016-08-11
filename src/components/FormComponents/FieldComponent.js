import React, { PropTypes } from 'react';
import { FormControl } from 'react-bootstrap';

export const FieldComponent = (props) => (
  <div>
    <FormControl type={props.type} {...props.input} disabled={props.disabled} />
    {props.error ? <b>{props.error}</b> : null}
  </div>
);

FieldComponent.propTypes = {
  error: PropTypes.string,
  input: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};
