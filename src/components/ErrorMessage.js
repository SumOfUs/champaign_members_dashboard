import React from 'react';
import { Alert } from 'react-bootstrap';

const ErrorMessage = ({ message }) => {
  if (!message) {
    return null;
  }

  return (
    <Alert bsStyle="danger">
      <p>{message}</p>
    </Alert>
  );
};

export default ErrorMessage;
