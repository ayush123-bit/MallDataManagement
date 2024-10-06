import React, { useEffect, useState } from 'react';
import './CategoriesSection.css';
import { useNavigate } from 'react-router-dom';

const CategoriesSection = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories from the API
    fetch('https://mallback.onrender.com/categories')
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);

  const handleCategoryClick = (category) => {
    // Navigate to the Products page with the selected category
    navigate('/products', { state: { category } });
  };

  return (
    <section className="categories">
      <h2>Shop by Category</h2>
      <div className="categories-list">
        {categories.map((category) => (
          <div 
            key={category.category} 
            className="category-item" 
            onClick={() => handleCategoryClick(category.category)}
          >
            <img src={category.categoryImage} alt={category.category} loading="lazy" />
            <p>{category.category}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoriesSection;
