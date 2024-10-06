import React from 'react';
import './ResponseModal.css'; // Import CSS for modal styling

const ResponseModal = ({ response, onClose }) => {
  return (
    <div className="response-modal-overlay">
      <div className="response-modal-content">
        <h3>Response Details</h3>
        <p><strong>Shopkeeper Email:</strong> {response.shopkeeperEmail}</p>
        <p><strong>Date & Time:</strong> {new Date(response.date).toLocaleString()}</p>
        <p><strong>Response:</strong> {response.response}</p>
        <button onClick={onClose} className="btn-close">Close</button>
      </div>
    </div>
  );
};

export default ResponseModal;
