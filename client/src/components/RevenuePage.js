import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';
import { Paper, Typography, CircularProgress } from '@mui/material';
import './RevenuePage.css'; // Make sure the CSS is consistent

const RevenuePage = () => {
  const [revenueData, setRevenueData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // All months by default with month names
  const defaultMonths = [
    { month: 'January', revenue: 0 },
    { month: 'February', revenue: 0 },
    { month: 'March', revenue: 0 },
    { month: 'April', revenue: 0 },
    { month: 'May', revenue: 0 },
    { month: 'June', revenue: 0 },
    { month: 'July', revenue: 0 },
    { month: 'August', revenue: 0 },
    { month: 'September', revenue: 0 },
    { month: 'October', revenue: 0 },
    { month: 'November', revenue: 0 },
    { month: 'December', revenue: 0 },
  ];

  useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        const response = await fetch('https://mallback.onrender.com/revenueData');

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        // Map the data to match month names
        const mappedData = data.map((item) => {
          const monthName = new Date(item.month + '-01').toLocaleString('default', { month: 'long' });
          return { month: monthName, revenue: item.revenue };
        });

        // Merge the fetched data with default months
        const mergedData = defaultMonths.map((defaultMonth) => {
          const found = mappedData.find((item) => item.month === defaultMonth.month);
          return found ? found : defaultMonth;
        });

        setRevenueData(mergedData);
        setLoading(false);
      } catch (err) {
        console.error('Fetch Error:', err);
        setError('Error fetching revenue data. Please try again later.');
        setLoading(false);
      }
    };

    fetchRevenueData();
  }, []);

  return (
    <Paper className="revenue-page-container">
      <Typography variant="h4" gutterBottom className="page-title">
        Monthly Revenue
      </Typography>

      {loading ? (
        <div className="loading-container">
          <CircularProgress />
        </div>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={500}>
            <BarChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
              <Legend />
              <Bar dataKey="revenue" fill="#007bff" name="Revenue" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </Paper>
  );
};

export default RevenuePage;
