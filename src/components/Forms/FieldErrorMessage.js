import React, { PropTypes } from 'react';

export default function FieldErrorMessage({ message }) {
  if (!message) { return null; }
  return <em className="pull-right text-danger">{message}</em>;
}

FieldErrorMessage.propTypes = {
  message: PropTypes.string,
};
