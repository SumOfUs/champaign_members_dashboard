import React, { PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';
import './LoadingOverlay.css';

export const LoadingOverlay = ({ enabled }) => {
  if (!enabled) {
    return null;
  }

  return (
    <div className="LoadingOverlay-overlay">
      <FontAwesome name="circle-o-notch" spin />
    </div>
  );
};

LoadingOverlay.propTypes = {
  enabled: PropTypes.bool.isRequired,
};
