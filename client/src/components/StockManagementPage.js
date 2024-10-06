import React, { useState } from 'react';
import { Paper, Typography, TextField, Button, CircularProgress, Alert } from '@mui/material';
import './StockManagementPage.css';
import NewNav2 from './header/NewNav2'; // Adjust the path as needed

const StockManagementPage = () => {
  const [productId, setProductId] = useState('');
  const [stock, setStock] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('https://mallback.onrender.com/updateStock', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, stock }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      if (data.success) {
        setSuccess('Stock updated successfully!');
      } else {
        setError('Error updating stock. Please try again.');
      }
    } catch (err) {
      console.error('Fetch Error:', err);
      setError('Error updating stock. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div className="stock-management-page">
      {/* Sidebar Component */}
      <NewNav2 />

      {/* Main Content */}
      <main className="main-content">
        <Paper className="stock-management-container">
          <Typography variant="h4" gutterBottom className="page-title">
            Stock Management
          </Typography>

          <form onSubmit={handleSubmit} className="stock-management-form">
            <TextField
              label="Product ID"
              variant="outlined"
              fullWidth
              margin="normal"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              required
            />
            <TextField
              label="Updated Stock"
              variant="outlined"
              fullWidth
              margin="normal"
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              required
            />
            <Button type="submit" variant="contained" color="primary" className="submit-button">
              {loading ? <CircularProgress size={24} /> : 'Update Stock'}
            </Button>
            {success && <Alert severity="success" className="alert">{success}</Alert>}
            {error && <Alert severity="error" className="alert">{error}</Alert>}
          </form>
        </Paper>
      </main>
    </div>
  );
};

export default StockManagementPage;
