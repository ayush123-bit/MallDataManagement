import React, { useState, useContext } from 'react';
import { EmailContext } from '../EmailContext'; // Import your Email Context
import './MessageForm.css'; // Import your CSS for styling

const MessageForm = () => {
  const { email } = useContext(EmailContext); // Use the Email Context to get the email
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null); // Add state for success message

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return; // Do not submit if message is empty

    setLoading(true);
    setError(null);
    setSuccess(null); // Reset success message

    try {
      const response = await fetch('https://mallback.onrender.com/sendMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          message,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Message sent successfully:', data);
      setMessage('');
      setSuccess('Message sent successfully!'); // Set success message
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Failed to send message. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="message-form-container">
      <h2>Send a Message</h2>
      <form onSubmit={handleSubmit} className="message-form">
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
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
            Send Message
          </button>
        )}
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>} {/* Display success message */}
      </form>
    </div>
  );
};

export default MessageForm;
