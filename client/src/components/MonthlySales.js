import React, { useEffect, useState } from 'react';
import AnalyticsDashboard from './AnalyticsDashboard';
import { Bar } from 'react-chartjs-2';
import './MonthlySales.css';

const MonthlySales = () => {
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await fetch('https://mallback.onrender.com/salesData');
        if (!response.ok) {
          throw new Error('Failed to fetch sales data');
        }
        const data = await response.json();
        setSalesData(data);
        console.log(data)
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSalesData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  // Define labels for all 12 months
  const monthLabels = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Prepare data for the chart (show 0 if no sales data for a particular month)
  const chartData = {
    labels: monthLabels,
    datasets: [
      {
        label: 'Number of Items Sold',
        data: monthLabels.map((month, index) => {
          const foundData = salesData.find(item => item._id.month === index + 1); // index + 1 to match month number
          return foundData ? foundData.totalQuantity : 0;
        }),
        backgroundColor: 'rgba(54, 162, 235, 0.6)', // Blue color with transparency
      borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 10 }, // Adjust step size as needed
      },
    },
    responsive: true,
    maintainAspectRatio: false, // For responsive resizing
  };

  return (
    <div className="monthly-sales-container">
      <AnalyticsDashboard />
      <div className="monthly-sales">
      <h2 className='page-title'>Monthly Sales (Number of Items Sold)</h2>
      <div className="chart-container1" style={{ height: '400px' }}> {/* Increase height for a larger chart */}
        <Bar data={chartData} options={chartOptions} />
      </div>
      </div>
    </div>
  );
};

export default MonthlySales;
