import React, { useState } from 'react';
import './AnalyticsDashboard.css'; // Import CSS for styling
import { useNavigate } from 'react-router-dom';
import { ArrowBack, ShowChart, Inventory2, Group, ShoppingCart, MonetizationOn } from '@mui/icons-material';
import { Typography, IconButton } from '@mui/material';
import NewNav2 from './header/NewNav2'; // Import the NewNav2 component

const AnalyticsDashboard = () => {
  const [activeDropdown, setActiveDropdown] = useState(null); // Track the active dropdown
  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path);
  };

  const toggleDropdown = (category) => {
    setActiveDropdown(activeDropdown === category ? null : category);
  };

  return (
    <div className="analytics-dashboard">
      <NewNav2 /> {/* Include the NewNav2 component */}

      <div className="main-content">
        <IconButton
          className="back-arrow"
          onClick={() => navigateTo('/')}
          aria-label="back"
        >
          <ArrowBack />
        </IconButton>
        <Typography variant="h4" gutterBottom>
          Analytics Dashboard
        </Typography>

        <div className="analytics-buttons">
          <div className="analytics-item">
            <button
              className={`analytics-btn ${activeDropdown === 'sales' ? 'active' : ''}`}
              onClick={() => toggleDropdown('sales')}
            >
              <ShowChart className="icon" /> Sales Analytics
            </button>
            {activeDropdown === 'sales' && (
              <div className="dropdown">
                <p onClick={() => navigateTo('/monthlysales')}>Monthly Sales</p>
                <p onClick={() => navigateTo('/topsellingproducts')}>Top Products</p>
                <p onClick={() => navigateTo('/salesbycategory')}>Category Sales</p>
              </div>
            )}
          </div>

          <div className="analytics-item">
            <button
              className={`analytics-btn ${activeDropdown === 'inventory' ? 'active' : ''}`}
              onClick={() => toggleDropdown('inventory')}
            >
              <Inventory2 className="icon" /> Inventory Analytics
            </button>
            {activeDropdown === 'inventory' && (
              <div className="dropdown">
                <p onClick={() => navigateTo('/stocklevels')}>Stock Levels</p>
                <p onClick={() => navigateTo('/lowstock')}>Low Stock Alerts</p>
                <p>Inventory Turnover</p>
              </div>
            )}
          </div>

          <div className="analytics-item">
            <button
              className={`analytics-btn ${activeDropdown === 'customer' ? 'active' : ''}`}
              onClick={() => toggleDropdown('customer')}
            >
              <Group className="icon" /> Customer Analytics
            </button>
            {activeDropdown === 'customer' && (
              <div className="dropdown">
                <p onClick={() => navigateTo('/newcustomers')}>New Customers</p>
                <p>Customer Retention</p>
                <p>Customer Feedback</p>
              </div>
            )}
          </div>

          <div className="analytics-item">
            <button
              className={`analytics-btn ${activeDropdown === 'orders' ? 'active' : ''}`}
              onClick={() => toggleDropdown('orders')}
            >
              <ShoppingCart className="icon" /> Order Analytics
            </button>
            {activeDropdown === 'orders' && (
              <div className="dropdown">
                <p>Pending</p>
                <p>Completed</p>
                <p onClick={() => navigateTo('/cancelledorders')}>Cancelled</p>
              </div>
            )}
          </div>

          <div className="analytics-item">
            <button
              className={`analytics-btn ${activeDropdown === 'revenue' ? 'active' : ''}`}
              onClick={() => toggleDropdown('revenue')}
            >
              <MonetizationOn className="icon" /> Revenue & Profit Analytics
            </button>
            {activeDropdown === 'revenue' && (
              <div className="dropdown">
                <p onClick={() => navigateTo('/monthlyrevenue')}>Monthly Revenue</p>
                <p>Profit Margins</p>
                <p>Expenses Breakdown</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
