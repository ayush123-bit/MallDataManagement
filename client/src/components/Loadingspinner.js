// LoadingSpinner.js
import React from 'react';
import './LoadingSpinner.css'; // Add some styles for spinner

const LoadingSpinner = () => {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  );
};

export default LoadingSpinner;
