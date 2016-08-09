import React from 'react';
import { FormControl } from 'react-bootstrap';

export const FieldComponent = (field) =>
  <FormControl type={field.type} {...field.input} />;
