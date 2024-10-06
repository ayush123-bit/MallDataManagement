import React, { useEffect, useState } from 'react';
import './HeroSection.css';

const HeroSection = () => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = '/Assets/login.jpg'; // High-res image
    img.onload = () => {
      setIsImageLoaded(true); // Set state when image is fully loaded
    };
  }, []);

  return (
    <section 
      className="hero" 
      style={{
        backgroundImage: isImageLoaded ? 'url(/Assets/login.jpg)' : 'none', 
      }}
    >
      <div className="hero-content">
        <h1>Welcome to Our Website</h1>
        <p>Discover our services and products.</p>
        <a href="/shop" className="btn-primary">Shop Now</a>
      </div>
    </section>
  );
};

export default HeroSection;
