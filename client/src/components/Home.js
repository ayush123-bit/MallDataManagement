import React, { useContext, useEffect, Suspense, lazy } from 'react';
import NewNav from './header/NewNav';
import Navbar from './header/Navbar';
import { useLocation } from 'react-router-dom';
import { EmailContext } from '../EmailContext.js'; // Adjust the import path accordingly
import Footer from './Footer';
import LoadingSpinner from './Loadingspinner.js'; // Assume you have a loading spinner component

// Lazy load sections for better performance
const HeroSection = lazy(() => import('./HeroSection'));
const CategoriesSection = lazy(() => import('./CategoriesSection'));
const FeaturedProducts = lazy(() => import('./FeaturedSection'));
const PromotionsSection = lazy(() => import('./PromotionSection'));
const NewsletterSection = lazy(() => import('./NewsletterSection'));

const Home = () => {
  const location = useLocation();
  const { message = "" } = location.state || {};
  const { email, setEmail } = useContext(EmailContext);

  console.log(email);

  useEffect(() => {
    const { emailFromLogin } = location.state || {};
    if (emailFromLogin) {
      setEmail(emailFromLogin); // Set the email in context
    }
  }, [location.state, setEmail]);

  return (
    <>
      {/* Conditionally render Navbar */}
      {message === "allowed" ? <NewNav /> : <Navbar />}

      {/* Suspense with fallback UI for each section */}
      <Suspense fallback={<LoadingSpinner />}>
        <HeroSection />
      </Suspense>

      <Suspense fallback={<LoadingSpinner />}>
        <CategoriesSection />
      </Suspense>

      <Suspense fallback={<LoadingSpinner />}>
        <FeaturedProducts />
      </Suspense>

      <Suspense fallback={<LoadingSpinner />}>
        <PromotionsSection />
      </Suspense>

      {/* Conditionally render Newsletter Section if message is not "allowed" */}
      {message === "allowed" ? null : (
        <Suspense fallback={<LoadingSpinner />}>
          <NewsletterSection />
        </Suspense>
      )}

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Home;
