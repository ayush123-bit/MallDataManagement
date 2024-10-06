import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button, CircularProgress, Paper, TextField } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { EmailContext } from '../EmailContext';
import { toast } from 'react-toastify'; // Import Toastify

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { email } = useContext(EmailContext);

  const handleAddToCart = async () => {
    try {
      const response = await fetch('https://mallback.onrender.com/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          productId: product.id,
          quantity: quantity,
        }),
      });

      if (response.ok) {
        toast.success('Product added to cart!'); // Show success notification
      } else {
        toast.error('Error adding product to cart'); // Show error notification
      }
    } catch (error) {
      toast.error('Network error occurred');
    }
  };

  const handleOrder = async () => {
    const totalPrice = product.price * quantity;
    try {
      const response = await fetch('https://mallback.onrender.com/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          productId: product.id,
          quantity: quantity,
          totalPrice: totalPrice
        }),
      });

      if (response.ok) {
        toast.success('Order placed successfully!'); // Show success notification
      } else {
        toast.error('Error placing order'); // Show error notification
      }
    } catch (error) {
      toast.error('Network error occurred');
    }
  };

  useEffect(() => {
    fetch(`https://mallback.onrender.com/productdetails/${id}`)
      .then(response => response.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching product details:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    ); 
  }

  if (!product) {
    return <Typography variant="h6" color="error">Product not found.</Typography>;
  }

  const handleQuantityChange = (event) => {
    const value = Math.max(1, event.target.value);
    setQuantity(value);
  };

  return (
    <Paper elevation={3} sx={{ padding: 3, maxWidth: 600, margin: 'auto', textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>{product.name}</Typography>
      <img 
        src={product.image} 
        alt={product.name} 
        loading="lazy" 
        style={{ width: '100%', height: 'auto', borderRadius: '8px' }} 
      />
      <Typography variant="h6" color="primary" sx={{ marginY: 2 }}>${product.price}</Typography>
      <Typography variant="body1" sx={{ marginBottom: 2 }}>{product.description}</Typography>
      <TextField
        type="number"
        label="Quantity"
        value={quantity}
        onChange={handleQuantityChange}
        inputProps={{ min: 1 }}
        sx={{ marginBottom: 2 }}
      />
      <div>
        <Button 
          variant="contained" 
          color="success" 
          startIcon={<AddShoppingCartIcon />}
          sx={{ marginRight: 1 }}
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<ShoppingCartCheckoutIcon />}
          onClick={handleOrder}
        >
          Order Now
        </Button>
      </div>
    </Paper>
  );
};

export default ProductDetails;
