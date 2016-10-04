import React, { PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';
import './LoadingOverlay.css';

export const LoadingOverlay = ({ enabled }) => {
  if (!enabled) {
    console.log('enabled is false');
    return null;
  }

  console.log('enabled is true');

  return (
    <div className="LoadingOverlay-overlay">
      <FontAwesome name="circle-o-notch" spin />
    </div>
  );
};

LoadingOverlay.propTypes = {
  enabled: PropTypes.bool.isRequired,
};
