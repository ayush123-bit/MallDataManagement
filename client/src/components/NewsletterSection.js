import React from 'react';
import './NewsletterSection.css';

const NewsletterSection = () => (
  <section className="newsletter">
    <h2>Stay Updated</h2>
    <p>Sign up for our newsletter to receive the latest news and exclusive offers.</p>
    <form className="newsletter-form">
      <input type="email" placeholder="Enter your email" required />
      <button type="submit" className="btn-primary">Subscribe</button>
    </form>
  </section>
);

export default NewsletterSection;
