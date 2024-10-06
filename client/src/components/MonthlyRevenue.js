import React from 'react';
import AnalyticsDashboard from './AnalyticsDashboard';
import RevenuePage from './RevenuePage';

const MonthlyRevenue = () => {
  // Function to check if the screen width is large
  const isLargeScreen = window.innerWidth >= 768;

  return (
    <>
      <AnalyticsDashboard />
      <div style={{ marginLeft: isLargeScreen ? '250px' : '0' }}>
        <RevenuePage />
      </div>
    </>
  );
};

export default MonthlyRevenue;
