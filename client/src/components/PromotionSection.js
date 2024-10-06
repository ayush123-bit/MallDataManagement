import React from 'react';
import './PromotionSection.css';

const PromotionSection = () => (
  <section className="promotions">
    <h2>Special Offers</h2>
    <div className="promotion-banner">
      <img src="/images/promo.jpg" alt="Promotion" />
      <div className="promo-details">
        <h3>Summer Sale: Up to 50% Off!</h3>
        <a href="/products" className="btn-primary">Shop Deals</a>
      </div>
    </div>
  </section>
);

export default PromotionSection;
