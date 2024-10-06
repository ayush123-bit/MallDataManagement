import React, { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Typography, Grid, Card, CardMedia, CardContent, Button, TextField } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { EmailContext } from '../EmailContext';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles

const SearchResults = () => {
  const location = useLocation();
  const { results, query } = location.state || { results: [], query: '' };
  const { email } = useContext(EmailContext); 
  const [quantities, setQuantities] = useState({});

  const handleQuantityChange = (id, value) => {
    setQuantities((prev) => ({ ...prev, [id]: value }));
  };

  const handleAddToCart = async (product) => {
    const quantity = quantities[product._id] || 1; // Default to 1 if not specified
    try {
      const response = await fetch('https://mallback.onrender.com/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          productId: product.id,
          quantity: quantity,
        }),
      });

      if (response.ok) {
        toast.success(`Product ${product.name} added to cart!`); // Show success notification
      } else {
        toast.error('Error adding product to cart'); // Show error notification
      }
    } catch (error) {
      toast.error('Network error occurred'); // Show network error notification
    }
  };

  const handleOrder = async (product) => {
    const quantity = quantities[product._id] || 1; // Default to 1 if not specified
    const totalPrice = product.price * quantity; // Calculate total price
    try {
      const response = await fetch('https://mallback.onrender.com/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          productId: product.id,
          quantity: quantity,
          totalPrice: totalPrice,
        }),
      });

      if (response.ok) {
        toast.success(`Order placed for ${product.name}!`); // Show success notification
      } else {
        toast.error('Error placing order'); // Show error notification
      }
    } catch (error) {
      toast.error('Network error occurred'); // Show network error notification
    }
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Search Results for "{query}"
      </Typography>

      <Grid container spacing={4}>
        {results.length ? (
          results.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product._id}>
              <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt={product.name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h5">{product.name}</Typography>
                  <Typography>{product.description}</Typography>
                  <Typography variant="h6" color="primary">${product.price}</Typography>
                  <TextField
                    type="number"
                    label="Quantity"
                    value={quantities[product._id] || 1}
                    onChange={(e) => handleQuantityChange(product._id, e.target.value)}
                    inputProps={{ min: 1 }}
                    sx={{ marginTop: 2 }}
                  />
                </CardContent>
                <Box sx={{ padding: 2, display: 'flex', justifyContent: 'space-between' }}>
                  <Button 
                    variant="contained" 
                    color="success" 
                    startIcon={<AddShoppingCartIcon />}
                    sx={{ flexGrow: 1, marginRight: 1 }}
                    onClick={() => handleAddToCart(product)} 
                  >
                    Add to Cart
                  </Button>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    startIcon={<ShoppingCartCheckoutIcon />}
                    sx={{ flexGrow: 1, marginLeft: 1 }}
                    onClick={() => handleOrder(product)} 
                  >
                    Order Now
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="h6">No products found.</Typography>
        )}
      </Grid>

      <ToastContainer /> {/* Include the ToastContainer here */}
    </Box>
  );
};

export default SearchResults;
