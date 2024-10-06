import React, { useState, useEffect, useContext } from 'react';
import { EmailContext } from '../EmailContext';
import { Box, Typography, Card, CardContent, Button, Grid, CircularProgress } from '@mui/material';
import './Cart.css';

const Cart = () => {
  const { email } = useContext(EmailContext);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch(`https://mallback.onrender.com/cart?email=${email}`);
        const data = await response.json();
        if (response.ok) {
          setCartItems(data.cartItems);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError('Failed to fetch cart items.');
      } finally {
        setLoading(false);
      }
    };

    if (email) {
      fetchCartItems();
    }
  }, [email]);

  const handleOrder = async (productId) => {
    try {
      const response = await fetch('https://mallback.onrender.com/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, productId }),
      });

      const data = await response.json();
      console.log(data)
      if (response.ok) {
        alert('Order placed successfully!');
        // Optionally, you can refresh the cart or navigate to another page
        // fetchCartItems();
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert('Failed to place order.');
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>
      {cartItems.length === 0 ? (
        <Typography>No items in the cart.</Typography>
      ) : (
        <Grid container spacing={2}>
          {cartItems.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <img src={item.productImage} alt={item.productName} style={{ height: '150px', objectFit: 'cover' }} />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6">{item.productName}</Typography>
                  <Typography variant="body2">{item.productDescription}</Typography>
                  <Typography variant="h6" color="primary">
                    Price: <b>${item.productPrice.toFixed(2)}</b>
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Date Added: <b>{new Date(item.dateAdded).toLocaleDateString()}</b>
                  </Typography>
                </CardContent>
                <Box sx={{ padding: 2 }}>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => handleOrder(item.productId)}
                    fullWidth
                  >
                    Order
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Cart;
