import React, { PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';
import styles from './LoadingOverlay.css';

export const LoadingOverlay = ({ enabled }) => {
  if (!enabled) {
    return null;
  }

  return (
    <div className={styles.overlay}>
      <FontAwesome name="circle-o-notch" spin />
    </div>
  );
};

LoadingOverlay.propTypes = {
  enabled: PropTypes.bool.isRequired,
};
