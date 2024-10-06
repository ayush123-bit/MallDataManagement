import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/header/Navbar';
import Login from './components/login';
import Home from './components/Home';
import ProductsSection from './components/ProductsSection';
import { EmailProvider } from './EmailContext.js'; // Import the EmailProvider
import Orders from './components/Orders.js';
import Cart from './components/Cart.js';
import Home2 from './components/Home2.js';
import ProductPage from './components/ProductPage.js';
import OrderPage from './components/OrderPage.js';
import RevenuePage from './components/RevenuePage.js';
import OutOfStockPage from './components/OutOfStockPage.js';
import StockManagementPage from './components/StockManagementPage.js';
import MessageForm from './components/MessageForm.js';
import MessagesTable from './components/MessagesTable.js';
import ResponseForm from './components/ResponseForm.js';
import AnalyticsDashboard from './components/AnalyticsDashboard.js';
import MonthlySales from './components/MonthlySales.js';
import MonthlyRevenue from './components/MonthlyRevenue.js';
import TopSellingProducts from './components/TopSellingProducts.js';
import SalesByCategory from './components/SalesByCategory.js';
import LowStock from './components/LowStock.js';
import NewCustomersData from './components/NewCustomersData.js';
import AddProduct from './components/AddProduct.js';
import SearchResults from './components/SearchResults.js';
import ProductDetails from './components/ProductDetails.js';
function App() {
  return (
    <EmailProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/enter" element={<Login />} />
            <Route path="/products" element={<ProductsSection />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/newcustomers" element={<NewCustomersData />} />
            <Route path="/lowstock" element={<LowStock />} />
            <Route path="/salesbycategory" element={<SalesByCategory />} />
            <Route path="/topsellingproducts" element={<TopSellingProducts />} />
            <Route path="/response" element={<ResponseForm />} />
            <Route path="/home2" element={<Home2 />} />
            <Route path="/addProduct" element={<AddProduct />} />
            <Route path="/monthlysales" element={<MonthlySales />} />
            <Route path="/monthlyrevenue" element={<MonthlyRevenue />} />
            <Route path="/analytics" element={<AnalyticsDashboard />} />
            <Route path="/products1" element={<ProductPage />} />
            <Route path="/orderTable" element={<OrderPage />} />
            <Route path="/messageuser" element={<MessageForm />} />
            <Route path="/messages" element={<MessagesTable />} />
            <Route path="/revenuePage" element={<RevenuePage />} />
            <Route path="/outofstock" element={<OutOfStockPage />} />
            <Route path="/stockmanagement" element={<StockManagementPage />} />
          </Routes>
        </div>
      </Router>
    </EmailProvider>
  );
}

export default App;
