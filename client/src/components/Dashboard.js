import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line, Bar } from 'react-chartjs-2';
import { Card, Grid, Typography, Box, Container } from '@mui/material';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './Dashboard.css'; // Keep your custom styles here
import { useNavigate } from 'react-router-dom';

// Register the required Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({});
  const [recentOrders, setRecentOrders] = useState([]);
  const [lowStock, setLowStock] = useState([]);
  const [salesData, setSalesData] = useState([]);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const statsRes = await axios.get('https://mallback.onrender.com/dashboard-stats');
        const recentOrdersRes = await axios.get('https://mallback.onrender.com/recent-orders');
        const lowStockRes = await axios.get('https://mallback.onrender.com/low-stock');
        const salesDataRes = await axios.get('https://mallback.onrender.com/sales-data');

        setStats(statsRes.data);
        setRecentOrders(Array.isArray(recentOrdersRes.data.recentOrders) ? recentOrdersRes.data.recentOrders : []);
        setLowStock(Array.isArray(lowStockRes.data.products) ? lowStockRes.data.products : []);
        setSalesData(Array.isArray(salesDataRes.data.sales) ? salesDataRes.data.sales : []);
      } catch (err) {
        console.error('Error fetching dashboard data', err);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <Box display="flex" className="body">
      {/* The Dashboard Container aligned to the left of NewNav2 */}
      <Box flexGrow={1} mr={2} p={3} className="dashboard-container" sx={{ maxWidth: '80%' }}>
        <Container>
          <Grid container spacing={2}>
            {/* Stats Overview Cards */}
            <Grid item xs={12} md={6} lg={3}>
              <Card
                className="dashboard-card"
                sx={{ backgroundColor: '#3b82f6', color: '#fff', cursor: 'pointer' }}
                onClick={() => navigate('/products1')}
              >
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Total Products</Typography>
                <Typography variant="h4">{stats.totalProducts || 'Loading...'}</Typography>
              </Card>
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
              <Card
                className="dashboard-card"
                sx={{ backgroundColor: '#f97316', color: '#fff', cursor: 'pointer' }}
                onClick={() => navigate('/orderTable')}
              >
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Total Orders</Typography>
                <Typography variant="h4">{stats.totalOrders || 'Loading...'}</Typography>
              </Card>
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
              <Card
                className="dashboard-card"
                sx={{ backgroundColor: '#22c55e', color: '#fff', cursor: 'pointer' }}
                onClick={() => navigate('/revenuePage')}
              >
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Revenue</Typography>
                <Typography variant="h4">${stats.totalRevenue || 'Loading...'}</Typography>
              </Card>
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
              <Card
                className="dashboard-card"
                sx={{ backgroundColor: '#ef4444', color: '#fff', cursor: 'pointer' }}
                onClick={() => navigate('/outofstock')}
              >
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Out of Stock</Typography>
                <Typography variant="h4">{stats.outOfStock || 'No Product'}</Typography>
              </Card>
            </Grid>

            {/* Sales Performance - Line Chart */}
            <Grid item xs={12} lg={8}>
              <Card className="dashboard-card" sx={{ padding: '1rem', backgroundColor: '#f5f5f5' }}>
                <Typography variant="h6" sx={{ marginBottom: '1rem', fontWeight: 'bold' }}>Sales Performance</Typography>
                <Line
                  data={{
                    labels: salesData.map(item => monthNames[item.month - 1] || 'Unknown'),
                    datasets: [
                      {
                        label: 'Sales ($)',
                        data: salesData.map(item => item.revenue),
                        borderColor: '#3b82f6',
                        backgroundColor: 'rgba(59, 130, 246, 0.2)',
                        borderWidth: 2,
                        fill: true,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        display: true,
                        position: 'top',
                      },
                    },
                    scales: {
                      x: {
                        title: {
                          display: true,
                          text: 'Month',
                        },
                      },
                      y: {
                        beginAtZero: true,
                        title: {
                          display: true,
                          text: 'Revenue ($)',
                        },
                      },
                    },
                  }}
                />
              </Card>
            </Grid>

            {/* Recent Orders */}
            <Grid item xs={12} lg={4}>
              <Card className="dashboard-card" sx={{ padding: '1rem', backgroundColor: '#f5f5f5', position: 'relative' }}>
                <Typography variant="h6" sx={{ marginBottom: '1rem', fontWeight: 'bold' }}>Recent Orders</Typography>
                <Box className="order-list" sx={{ maxHeight: '300px', overflowY: 'auto' }}>
                  {recentOrders.length > 0 ? (
                    recentOrders.map((order, index) => (
                      <Box key={index} sx={{ padding: '0.5rem', borderBottom: '1px solid #ddd' }}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                          Product: {order.orders.productId}
                        </Typography>
                        <Typography variant="body2">
                          Quantity: {order.orders.quantity} pcs
                        </Typography>
                        <Typography variant="body2">
                          Total Price: ${order.orders.totalPrice.toFixed(2)}
                        </Typography>
                      </Box>
                    ))
                  ) : (
                    <Typography variant="body1">No recent orders</Typography>
                  )}
                </Box>
              </Card>
            </Grid>

            {/* Low Stock Alerts */}
            <Grid item xs={12} lg={4}>
              <Card className="dashboard-card" sx={{ padding: '1rem', backgroundColor: '#f5f5f5', position: 'relative' }}>
                <Typography variant="h6" sx={{ marginBottom: '1rem', fontWeight: 'bold' }}>Low Stock Alerts</Typography>
                <Box className="alert-list" sx={{ maxHeight: '300px', overflowY: 'auto' }}>
                  {lowStock.length > 0 ? (
                    lowStock.map((product, index) => (
                      <Box key={index} sx={{ padding: '0.5rem', borderBottom: '1px solid #ddd' }}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                          {product.name}
                        </Typography>
                        <Typography variant="body2">
                          Only {product.stock} left
                        </Typography>
                      </Box>
                    ))
                  ) : (
                    <Typography variant="body1">No low stock alerts</Typography>
                  )}
                </Box>
              </Card>
            </Grid>

            {/* Orders per Category - Bar Chart */}
            <Grid item xs={12} lg={8}>
              <Card className="dashboard-card" sx={{ padding: '1rem', backgroundColor: '#f5f5f5' }}>
                <Typography variant="h6" sx={{ marginBottom: '1rem', fontWeight: 'bold' }}>Dashboard Statistics</Typography>
                <Bar
                  data={{
                    labels: ['Total Products', 'Total Orders', 'Total Revenue', 'Out of Stock'],
                    datasets: [
                      {
                        label: 'Statistics',
                        data: [
                          stats.totalProducts || 0,
                          stats.totalOrders || 0,
                          stats.totalRevenue || 0,
                          stats.outOfStock || 0
                        ],
                        backgroundColor: ['#3b82f6', '#f97316', '#22c55e', '#ef4444'],
                        borderColor: ['#3b82f6', '#f97316', '#22c55e', '#ef4444'],
                        borderWidth: 1,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        display: true,
                        position: 'top',
                      },
                    },
                  }}
                />
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;
