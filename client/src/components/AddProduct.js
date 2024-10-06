import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Paper } from '@mui/material';
import { AddBox } from '@mui/icons-material';
import NewNav2 from './header/NewNav2';
import './AddProduct.css'; // Custom CSS for additional styling

const AddProduct = () => {
  const [formData, setFormData] = useState({
    id: '',
    category: '',
    categoryImage: null,
    name: '',
    description: '',
    price: '',
    stock: '',
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleCategoryImageChange = (e) => {
    setFormData({
      ...formData,
      categoryImage: e.target.files[0],
    });
  };

  // Function to generate product description using AI
  const handleGenerateDescription = async () => {
    try {
      const response = await fetch('https://mallback.onrender.com/generate-description', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productName: formData.name,
          category: formData.category,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setFormData((prev) => ({ ...prev, description: data.description }));
      } else {
        alert('Error generating description');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const productData = new FormData();
    Object.keys(formData).forEach((key) => {
      productData.append(key, formData[key]);
    });

    try {
      const response = await fetch('http://localhost:5000/addProduct', {
        method: 'POST',
        body: productData,
      });
      if (response.ok) {
        alert('Product added successfully');
      } else {
        alert('Error adding product');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 4, maxWidth: 800, margin: '20px auto' }}>
      <NewNav2 />
      <Typography variant="h4" gutterBottom style={{ color: 'blue' }}>
        Add Product <AddBox fontSize="large" />
      </Typography>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Product ID"
              name="id"
              value={formData.id}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              component="label"
              fullWidth
              color="primary"
            >
              Upload Category Image
              <input
                type="file"
                hidden
                onChange={handleCategoryImageChange}
                accept="image/*"
                required
              />
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Product Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              multiline
              rows={4}
              fullWidth
              required
            />
            <Button
              variant="outlined"
              onClick={handleGenerateDescription}
              fullWidth
              style={{ marginTop: '16px' }}
            >
              Generate through AI
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              type="number"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Stock"
              name="stock"
              value={formData.stock}
              onChange={handleInputChange}
              type="number"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              component="label"
              fullWidth
              color="primary"
            >
              Upload Product Image
              <input
                type="file"
                hidden
                onChange={handleImageChange}
                accept="image/*"
                required
              />
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="secondary" fullWidth>
              Add Product
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default AddProduct;
