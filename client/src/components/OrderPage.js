import React, { useEffect, useState } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, Paper, Typography, CircularProgress } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // Import CheckCircle icon
import './OrderPage.css'; // Importing external CSS

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('https://mallback.onrender.com/ordersTable');
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setOrders(data);
        setLoading(false);
      } catch (err) {
        console.error('Fetch Error:', err);
        setError('Error fetching orders. Please try again later.');
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <Paper className="orders-page-container">
      <Typography variant="h4" gutterBottom className="page-title">
        Orders List
      </Typography>
      
      {loading ? (
        <div className="loading-container">
          <CircularProgress />
        </div>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Table className="orders-table">
          <TableHead>
            <TableRow className="table-header">
              <TableCell>Email Address</TableCell>
              <TableCell>Order Date</TableCell>
              <TableCell>Product ID</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell>Status</TableCell> {/* Added Status Column */}
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.length > 0 ? (
              orders.flatMap((user) => 
                user.orders
                  
                  .map((order, index) => (
                    <TableRow key={index} className="table-row">
                      <TableCell>{user.emailAddress}</TableCell>
                      <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                      <TableCell>{order.productId}</TableCell>
                      <TableCell>{order.quantity}</TableCell>
                      <TableCell>${order.totalPrice.toFixed(2)}</TableCell>
                      <TableCell>
                        {order.cancelled=='cancelled' ? (
                          <Typography color="error" display="flex" alignItems="center">
                            <CancelIcon style={{ marginRight: 8 }} />
                            Cancelled
                          </Typography>
                        ) : (
                          <Typography color="success" display="flex" alignItems="center">
                            <CheckCircleIcon style={{ marginRight: 8, color: 'green' }} />
                            Active
                          </Typography>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
              )
            ) : (
              <TableRow>
                <TableCell colSpan={6} style={{ textAlign: 'center' }}>
                  No orders available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </Paper>
  );
};

export default OrderPage;
