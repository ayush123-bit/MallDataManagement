import React, { useEffect, useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, CircularProgress, Grid } from '@mui/material';
import AnalyticsDashboard from './AnalyticsDashboard'; // Import your AnalyticsDashboard component
import './TopSellingProducts.css'; // Import custom CSS for styling

const TopSellingProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopSellingProducts = async () => {
      try {
        const response = await fetch('https://mallback.onrender.com/topSellingProducts'); // Replace with your actual API endpoint

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Fetched Top Selling Products:', data);

        setProducts(data);
        setLoading(false);
      } catch (err) {
        console.error('Fetch Error:', err);
        setError('Error fetching top-selling products. Please try again later.');
        setLoading(false);
      }
    };

    fetchTopSellingProducts();
  }, []);

  return (
    <Paper className="top-selling-products-container">
      <Grid>
        {/* Analytics Dashboard */}
        <Grid item xs={12} sm={10}>
          <AnalyticsDashboard />
        </Grid>

        <div className="topSellingBody">
          {/* Title */}
          <Grid item xs={12} sm={10}>
            <Typography variant="h4" gutterBottom className="page-title">
              Top Selling Products
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
          ) : products.length === 0 ? (
            <Grid item xs={12} sm={10}>
              <Typography color="textSecondary" className="no-data-message">
                No top-selling products found.
              </Typography>
            </Grid>
          ) : (
            <Grid item xs={12} sm={10} className="table-container">
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell className="table-header">Product ID</TableCell>
                      <TableCell className="table-header">Name</TableCell>
                      <TableCell className="table-header">Description</TableCell>
                      <TableCell className="table-header" align="right">Price</TableCell>
                      <TableCell className="table-header" align="right">Stock</TableCell>
                      <TableCell className="table-header" align="right">Quantity Sold</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.productId}>
                        <TableCell data-label="Product ID" component="th" scope="row">
                          {product.productId}
                        </TableCell>
                        <TableCell data-label="Name">{product.name}</TableCell>
                        <TableCell data-label="Description">{product.description}</TableCell>
                        <TableCell data-label="Price" align="right">${product.price}</TableCell>
                        <TableCell data-label="Stock" align="right">{product.stock}</TableCell>
                        <TableCell data-label="Quantity Sold" align="right">{product.totalQuantitySold}</TableCell>
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

export default TopSellingProducts;
