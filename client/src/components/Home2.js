import React, { useContext, useEffect } from 'react';
import NewNav2 from './header/NewNav2'
import Dashboard from './Dashboard'
import Footer from './Footer'
import { EmailContext } from '../EmailContext.js';
import { useLocation } from 'react-router-dom';
const Home2 = () => {
  const location = useLocation();
  
  const { email, setEmail } = useContext(EmailContext);
  console.log(email);
  useEffect(() => {
    const { emailFromLogin } = location.state || {};
    if (emailFromLogin) {
      setEmail(emailFromLogin); // Set the email in context
    }
  }, [location.state, setEmail]);
  console.log(email);
  return (
    <>
     <NewNav2/> 
     <Dashboard/>
     <Footer/>
    </>
  )
}

export default Home2
