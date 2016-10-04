import React, { PropTypes } from 'react';

export default function RegistrationSuccess({ email }) {
  return (
    <div id="registration-success" >
      <p>Thank you! Check your email: <code>{email}</code> for a confirmation link.</p>
    </div>
  );
}

RegistrationSuccess.propTypes = {
  email: PropTypes.string.isRequired,
};
