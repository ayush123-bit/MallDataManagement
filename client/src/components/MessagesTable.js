import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MessagesTable.css'; // Import your CSS file for styling
import ResponseModal from './ResponseModal'; // Import the Modal component
import NewNav2 from './header/NewNav2'; // Import the NewNav2 component

const MessagesTable = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedResponse, setSelectedResponse] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('https://mallback.onrender.com/getMessages');
        if (!response.ok) {
          throw new Error('Failed to fetch messages');
        }
        const data = await response.json();
        setMessages(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const handleRowClick = (userEmail, messageDate) => {
    navigate('/response', {
      state: { userEmail, messageDate },
    });
  };

  const handleTickClick = (response) => {
    setSelectedResponse(response);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="messages-table-wrapper">
      <NewNav2 /> {/* Add your vertical navbar here */}
      <div className="messages-table-content">
        <h2>All Messages</h2>
        <table className="messages-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Date & Time</th>
              <th>Message</th>
              <th>Response</th> {/* New column for Response */}
            </tr>
          </thead>
          <tbody>
            {messages.map((msg, index) => (
              <tr key={index} onClick={() => handleRowClick(msg.userEmail, msg.messages[0].date)}>
                <td>{msg.userEmail}</td>
                <td>{new Date(msg.messages[0].date).toLocaleString()}</td>
                <td>{msg.messages[0].content}</td>
                <td>
                  {msg.responses.length > 0 && (
                    <span
                      className="response-tick"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering row click event
                        handleTickClick(msg.responses[0]); // Assuming the latest response is at index 0
                      }}
                    >
                      &#10003; {/* Checkmark Unicode */}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Render the modal if a response is selected */}
        {selectedResponse && (
          <ResponseModal
            response={selectedResponse}
            onClose={() => setSelectedResponse(null)}
          />
        )}
      </div>
    </div>
  );
};

export default MessagesTable;
