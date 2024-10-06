import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './FeaturedSection.css';

const FeaturedSection = () => {
  const [products, setProducts] = useState([]);
  console.log(products);

  useEffect(() => {
    // Fetch product data from the server
    fetch('https://mallback.onrender.com/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
    <section className="featured-products">
      <h2>Featured Products</h2>
      <div className="product-list">
        {products.map((product, index) => (
          <div className="product-card" key={index}>
            <img src={product.image} alt={product.name} loading="lazy" />
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <Link to={`/products/${product.id}`} className="btn-secondary">View Details</Link> {/* Use Link instead of anchor */}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedSection;
