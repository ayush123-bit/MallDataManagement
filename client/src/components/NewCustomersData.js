import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';
import { Paper, Typography, CircularProgress, Grid } from '@mui/material';
import AnalyticsDashboard from './AnalyticsDashboard'; // Import your AnalyticsDashboard component
import './NewCustomersData.css'; // Custom CSS for styling

const NewCustomersData = () => {
  const [newCustomersData, setNewCustomersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNewCustomersData = async () => {
      try {
        const response = await fetch('https://mallback.onrender.com/newCustomersByMonth'); // Your actual API endpoint

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const { data } = await response.json();
        console.log('Fetched New Customers Data:', data);

        // Transform the response data to make it usable for the BarChart
        const formattedData = data.map(item => ({
          month: new Date(2024, item.month - 1).toLocaleString('default', { month: 'long' }),
          customers: item.customers
        }));

        setNewCustomersData(formattedData);
        setLoading(false);
      } catch (err) {
        console.error('Fetch Error:', err);
        setError('Error fetching new customers data. Please try again later.');
        setLoading(false);
      }
    };

    fetchNewCustomersData();
  }, []);

  // Determine the max value to set the Y-axis ticks
  const maxValue = Math.max(...newCustomersData.map(item => item.customers), 5); // Ensure at least 5 for tick range

  // Generate Y-axis ticks
  const yAxisTicks = Array.from({ length: Math.ceil(maxValue) }, (_, i) => i + 1);

  return (
    <Paper className="new-customers-data-container">
      <Grid  >
        {/* Analytics Dashboard */}
          <div className='analytics'>
          <AnalyticsDashboard/>
          </div>

        {/* Title */}
       <Grid className='body'>
       <Grid item xs={12} sm={10}>
          <Typography variant="h4" gutterBottom className="page-title1">
            New Customers by Month
          </Typography>
        </Grid>

        {/* Loading Spinner */}
        {loading ? (
          <Grid item xs={12} sm={10} className="loading-container">
            <CircularProgress />
          </Grid>
        ) : error ? (
          <Grid item xs={12} sm={10}>
            <Typography color="error" className="error-message">
              {error}
            </Typography>
          </Grid>
        ) : newCustomersData.length === 0 ? (
          <Grid item xs={12} sm={10}>
            <Typography color="textSecondary" className="no-data-message">
              No new customers data available.
            </Typography>
          </Grid>
        ) : (
          <Grid item xs={12} sm={10} className="chart-container">
            <ResponsiveContainer width="100%" height={400}> {/* Ensure the chart height is responsive */}
              <BarChart
                data={newCustomersData}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" label={{ value: 'Month', position: 'insideBottom', offset: -10 }} />
                <YAxis 
                  label={{ value: 'Customers', angle: -90, position: 'insideLeft' }} 
                  ticks={yAxisTicks} // Custom Y-axis ticks
                />
                <Tooltip />
                <Legend verticalAlign="top" />
                <Bar dataKey="customers" fill="#007bff" barSize={60} name="New Customers" /> {/* Blue color */}
              </BarChart>
            </ResponsiveContainer>
          </Grid>
        )}
       </Grid>
      </Grid>
    </Paper>
  );
};

export default NewCustomersData;
