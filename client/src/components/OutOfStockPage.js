// OutOfStockPage.js
import React, { useEffect, useState } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, Paper, Typography, CircularProgress } from '@mui/material';
import './OutOfStockPage.css'; // Import the CSS for the table styling

const OutOfStockPage = () => {
  const [outOfStockProducts, setOutOfStockProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOutOfStockProducts = async () => {
      try {
        const response = await fetch('https://mallback.onrender.com/outOfStockProducts');
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setOutOfStockProducts(data);
        setLoading(false);
      } catch (err) {
        console.error('Fetch Error:', err);
        setError('Error fetching out of stock products. Please try again later.');
        setLoading(false);
      }
    };

    fetchOutOfStockProducts();
  }, []);

  return (
    <Paper className="out-of-stock-page-container">
      <Typography variant="h4" gutterBottom className="page-title">
        Out of Stock Products
      </Typography>

      {loading ? (
        <div className="loading-container">
          <CircularProgress />
        </div>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Table className="out-of-stock-table">
          <TableHead>
            <TableRow className="table-header">
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {outOfStockProducts.length > 0 ? (
              outOfStockProducts.map((product) => (
                <TableRow key={product.id} className="table-row">
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>{product.description}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} style={{ textAlign: 'center' }}>
                  No products are out of stock.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </Paper>
  );
};

export default OutOfStockPage;
