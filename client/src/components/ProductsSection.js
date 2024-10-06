import React, { useEffect, useState, useContext } from 'react';
import './ProductsSection.css';
import { useLocation } from 'react-router-dom';
import { EmailContext } from '../EmailContext.js'; // Import EmailContext

const ProductsSection = () => {
  const location = useLocation();
  const { category } = location.state || {};
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({}); // State to store quantities for each product
  const { email } = useContext(EmailContext); // Get the email from context
   console.log(email);
  useEffect(() => {
    // Fetch all products for the selected category from the API
    fetch(`https://mallback.onrender.com/products1?category=${category}`)
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, [category]);

  // Handle quantity change for each product
  const handleQuantityChange = (productId, value) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: value,
    }));
  };

  const handleAddToCart = async (product) => {
    const quantity = quantities[product.id] || 1; // Get the quantity or default to 1
    try {
      const response = await fetch('https://mallback.onrender.com/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,               // Sending email address to the server
          productId: product.id,     // Sending productId to the server
          quantity: quantity,        // Sending the specified quantity
        }),
      });

      if (response.ok) {
        console.log('Product added to cart:', product.id);
      } else {
        console.error('Error adding product to cart');
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  const handleOrder = async (product) => {
    const quantity = quantities[product.id] || 1;
     // Get the quantity or default to 1
     const totalPrice=product.price*quantity;
    try {
      const response = await fetch('https://mallback.onrender.com/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,               // Sending email address to the server
          productId: product.id,     // Sending productId to the server
          quantity: quantity,
          totalPrice:totalPrice
        }),
      });

      if (response.ok) {
        console.log('Order placed for product:', product.id);
      } else {
        console.error('Error placing order');
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  return (
    <section className="products-section">
      <h2>All Products</h2>
      <div className="products-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} loading="lazy" className="product-image" />
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <p className="product-price">${product.price}</p>
              <div className="product-quantity">
                <label htmlFor={`quantity-${product.id}`}>Quantity:</label>
                <input
                  type="number"
                  id={`quantity-${product.id}`}
                  name="quantity"
                  value={quantities[product.id] || 1}
                  onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value, 10))}
                  min="1"
                  className="quantity-input"
                />
              </div>
              <div className="product-buttons">
                <button onClick={() => handleAddToCart(product)} className="btn btn-add-to-cart">Add to Cart</button>
                <button onClick={() => handleOrder(product)} className="btn btn-order">Order</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductsSection;
