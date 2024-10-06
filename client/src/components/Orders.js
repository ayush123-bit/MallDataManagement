import React, { useState, useEffect, useContext } from 'react';
import { EmailContext } from '../EmailContext';
import { Button, CircularProgress, Typography, Box, Card, CardMedia, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import './Orders.css';

const Orders = () => {
  const { email } = useContext(EmailContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);  // State to control modal visibility
  const [selectedOrder, setSelectedOrder] = useState(null);  // Track the order object being cancelled

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`https://mallback.onrender.com/orders?email=${email}`);
        const data = await response.json();
        if (response.ok) {
          setOrders(data.orders);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError('Failed to fetch orders.');
      } finally {
        setLoading(false);
      }
    };

    if (email) {
      fetchOrders();
    }
  }, [email]);

  // Open confirmation modal
  const handleOpen = (order) => {
    setSelectedOrder(order);
    setOpen(true);
  };

  // Close modal without cancelling
  const handleClose = () => {
    setOpen(false);
    setSelectedOrder(null);
  };

  const confirmCancelOrder = async () => {
    if (!selectedOrder) return;

    try {
      const response = await fetch(`https://mallback.onrender.com/cancel`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          productId: selectedOrder.productId,
          quantity: selectedOrder.quantity,
          totalPrice: selectedOrder.totalPrice,
          date: selectedOrder.date,
        }),
      });

      if (response.ok) {
        const updatedOrders = orders.map(order =>
          order._id === selectedOrder._id ? { ...order, cancelled: 1 } : order
        );
        setOrders(updatedOrders);
        alert('Order canceled and product restocked successfully');
      } else {
        alert('Failed to cancel order.');
      }
    } catch (err) {
      alert('Error canceling order.');
    } finally {
      handleClose();  // Close the modal after the action
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>Your Orders</Typography>
      {orders.length === 0 ? (
        <Typography>No orders found.</Typography>
      ) : (
        <Box className="orders-container">
          {orders.map((order, index) => (
            <Card key={index} className="order-card">
              <CardMedia
                component="img"
                height="140"
                image={order.productImage}
                alt={order.productName}
                className="order-image"
              />
              <CardContent className="order-details">
                <Typography variant="h5">{order.productName}</Typography>
                <Typography>{order.productDescription}</Typography>
                <Typography>Quantity: <b>{order.quantity}</b></Typography>
                <Typography>Total Price: <b>${order.totalPrice.toFixed(2)}</b></Typography>
                <Typography>Order Date: <b>{new Date(order.date).toLocaleDateString()}</b></Typography>

                {order.cancelled ? (
                  <Typography className="cancelled-text" color="error">Order Cancelled</Typography>
                ) : (
                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<CancelIcon />}
                    onClick={() => handleOpen(order)}
                    className="cancel-order-button"
                  >
                    Cancel Order
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      {/* Confirmation Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="cancel-order-dialog-title"
        aria-describedby="cancel-order-dialog-description"
      >
        <DialogTitle id="cancel-order-dialog-title">Cancel Order Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText id="cancel-order-dialog-description">
            Are you sure you want to cancel this order?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
          <Button onClick={confirmCancelOrder} color="error" variant="contained">
            Yes, Cancel Order
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Orders;
