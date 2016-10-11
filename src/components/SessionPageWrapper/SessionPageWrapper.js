import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import './SessionPageWrapper.css';
import logo from 'sou-assets/images/logo-positive.png';

const logoStyle = {
  backgroundImage: `url(${logo})`,
  backgroundSize: '100%',
};
const SessionPageWrapper = ({ children }) => {
  return (
    <div className="SessionPageWrapper">
      <div className="SessionPageWrapper-header">
        <Link to="/" >
          <div className="SessionPageWrapper-logo" style={logoStyle}></div>
        </Link>
      </div>
      <div className="SessionPageWrapper-content">
        {children || null}
      </div>
    </div>
  );
};

SessionPageWrapper.propTypes = {
  children: PropTypes.node,
};

export default SessionPageWrapper;
