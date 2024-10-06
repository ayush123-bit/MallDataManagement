import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';
import { Paper, Typography, CircularProgress, Grid } from '@mui/material';
import AnalyticsDashboard from './AnalyticsDashboard'; // Import your AnalyticsDashboard component
import './SalesByCategory.css'; // Custom CSS for styling

const SalesByCategory = () => {
  const [categorySalesData, setCategorySalesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategorySalesData = async () => {
      try {
        const response = await fetch('https://mallback.onrender.com/salesByCategory'); // Replace with your actual API endpoint

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const { categorySales } = await response.json();
        console.log('Fetched Data:', categorySales); // Check the response in the console

        // Transform the response to be usable in the BarChart component
        const formattedData = Object.keys(categorySales).map(category => ({
          category,
          sales: categorySales[category]
        }));

        setCategorySalesData(formattedData);
        setLoading(false);
      } catch (err) {
        console.error('Fetch Error:', err);
        setError('Error fetching sales by category data. Please try again later.');
        setLoading(false);
      }
    };

    fetchCategorySalesData();
  }, []);

  return (
    <Paper className="sales-by-category-container">
      <Grid >
        {/* Analytics Dashboard */}
        <Grid item xs={12} sm={10}>
          <AnalyticsDashboard />
        </Grid>

        {/* Title */}
       <div className='body'>
       <Grid item xs={12} sm={10}>
          <Typography variant="h4" gutterBottom className="page-title1">
            Sales by Category
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
        ) : categorySalesData.length === 0 ? (
          <Grid item xs={12} sm={10}>
            <Typography color="textSecondary" className="no-data-message">
              No sales data available.
            </Typography>
          </Grid>
        ) : (
          <Grid item xs={12} sm={10} className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={categorySalesData}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" label={{ value: 'Categories', position: 'insideBottom', offset: -10 }} />
                <YAxis label={{ value: 'Sales', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend verticalAlign="top" />
                <Bar dataKey="sales" fill="#007bff" barSize={60} name="Sales by Category" />
              </BarChart>
            </ResponsiveContainer>
          </Grid>
        )}
       </div>
      </Grid>
    </Paper>
  );
};

export default SalesByCategory;
