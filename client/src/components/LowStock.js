import React, { useEffect, useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, CircularProgress, Grid } from '@mui/material';
import AnalyticsDashboard from './AnalyticsDashboard'; // Import your AnalyticsDashboard component
import './LowStock.css'; // Import custom CSS for styling

const LowStock = () => {
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLowStockProducts = async () => {
      try {
        const response = await fetch('https://mallback.onrender.com/outOfStockProducts'); // Replace with your actual API endpoint

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const products = await response.json();

        // Ensure the response is an array before setting it in the state
        if (Array.isArray(products)) {
          setLowStockProducts(products);
        } else {
          throw new Error('Invalid data format');
        }
        setLoading(false);
      } catch (err) {
        console.error('Fetch Error:', err);
        setError('No product is out of stock.');
        setLoading(false);
      }
    };

    fetchLowStockProducts();
  }, []);

  return (
    <Paper className="low-stock-container">
      <Grid>
        {/* Analytics Dashboard */}
        <Grid item xs={12} sm={10}>
          <AnalyticsDashboard />
        </Grid>

        <div className="lowstockBody">
          {/* Title */}
          <Grid item xs={12} sm={10}>
            <Typography variant="h4" gutterBottom className="page-title">
              Low Stock Products
            </Typography>
          </Grid>

          {/* Loading Spinner */}
          {loading ? (
            <Grid item xs={12} sm={10} className="loading-container">
              <CircularProgress />
            </Grid>
          ) : error ? (
            <Grid item xs={12} sm={10}>
              <Typography color="error" className="error-message">
                {error}
              </Typography>
            </Grid>
          ) : lowStockProducts.length === 0 ? (
            <Grid item xs={12} sm={10}>
              <Typography color="textSecondary" className="no-data-message">
                No stock is in low quantity.
              </Typography>
            </Grid>
          ) : (
            <Grid item xs={12} sm={10} className="table-container">
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell className="table-header">Product Name</TableCell>
                      <TableCell className="table-header" align="right">Category</TableCell>
                      <TableCell className="table-header" align="right">Stock</TableCell>
                      <TableCell className="table-header" align="right">Price</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {lowStockProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell data-label="Product Name" component="th" scope="row">
                          {product.name}
                        </TableCell>
                        <TableCell data-label="Category" align="right">{product.category}</TableCell>
                        <TableCell data-label="Stock" align="right">{product.stock}</TableCell>
                        <TableCell data-label="Price" align="right">${product.price}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          )}
        </div>
      </Grid>
    </Paper>
  );
};

export default LowStock;
