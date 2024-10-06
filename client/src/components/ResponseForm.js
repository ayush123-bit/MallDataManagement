import React, { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation
import { EmailContext } from '../EmailContext'; // Import Email Context
import './ResponseForm.css'; // Import CSS for styling

const ResponseForm = () => {
  const { email } = useContext(EmailContext); // Use context to get shopkeeper's email
  const location = useLocation(); // Use useLocation to get location object
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(''); // New state for success message

  // Extract data from location state
  const { userEmail, messageDate } = location.state || {};
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!response.trim()) return; // Do not submit if response is empty

    setLoading(true);
    setError(null);
    setSuccessMessage(''); // Clear any previous success message

    try {
      const res = await fetch('https://mallback.onrender.com/sendResponse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          userEmail,
          messageDate,
          response,
        }),
      });

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await res.json();
      console.log('Response sent successfully:', data);
      setResponse('');
      setSuccessMessage('Response sent successfully!'); // Set success message
    } catch (err) {
      console.error('Error sending response:', err);
      setError('Failed to send response. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (!userEmail || !messageDate) {
    return <p>Error: Missing message data.</p>;
  }

  return (
    <div className="response-form-container">
      <h2>Respond to Message</h2>
      <form onSubmit={handleSubmit} className="response-form">
        <div className="form-group">
          <label htmlFor="response">Response</label>
          <textarea
            id="response"
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            rows="5"
            required
          />
        </div>
        {loading ? (
          <button type="button" className="btn-submit" disabled>
            Sending...
          </button>
        ) : (
          <button type="submit" className="btn-submit">
            Send Response
          </button>
        )}
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>} {/* Display success message */}
      </form>
    </div>
  );
};

export default ResponseForm;
