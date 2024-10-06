import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import { Dashboard, Store, Analytics, AccountCircle, Mail, ExitToApp, Menu, AddBox, Margin } from '@mui/icons-material'; // Import AddBox icon
import './NewNav2.css'; // Import your custom CSS

const NewNav2 = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Handle opening/closing of mobile drawer
  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  // Drawer items (vertical links)
  const drawerItems = (
    <List sx={{ width: 250 }}>
      <ListItem
        button
        component={NavLink}
        to="/home2"
        activeClassName="Mui-selected"
      >
        <ListItemIcon><Dashboard /></ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>

      <ListItem
        button
        component={NavLink}
        to="/stockmanagement"
        activeClassName="Mui-selected"
      >
        <ListItemIcon><Store /></ListItemIcon>
        <ListItemText primary="Stock Management" />
      </ListItem>

      <ListItem
        button
        component={NavLink}
        to="/analytics"
        activeClassName="Mui-selected"
      >
        <ListItemIcon><Analytics /></ListItemIcon>
        <ListItemText primary="Analytics" />
      </ListItem>

      <ListItem
        button
        component={NavLink}
        to="/addProduct"
        activeClassName="Mui-selected"
      >
        <ListItemIcon><AddBox /></ListItemIcon> {/* AddBox icon for Add Product */}
        <ListItemText primary="Add Product" />
      </ListItem>

      <ListItem
        button
        component={NavLink}
        to="/profile"
        activeClassName="Mui-selected"
      >
        <ListItemIcon><AccountCircle /></ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItem>

      <ListItem
        button
        component={NavLink}
        to="/messages"
        activeClassName="Mui-selected"
      >
        <ListItemIcon><Mail /></ListItemIcon>
        <ListItemText  primary="Messages" />
      </ListItem>

      <ListItem
        button
        component={NavLink}
        to="/logout"
        activeClassName="Mui-selected"
      >
        <ListItemIcon><ExitToApp /></ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItem>
    </List>
  );

  return (
    <div>
      {/* Mobile Menu Icon */}
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={toggleMobileMenu}
        sx={{ display: { md: 'none' } }}
      >
        <Menu />
      </IconButton>

      {/* Permanent Vertical Drawer for larger screens */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250, backgroundColor: '#1976d2' },
        }}
        open
      >
        <div className="navbar-logo">
          <img src="/Assets/logo.png" alt="Logo" className="logo" />
          <h2 className='logohead' style={{color:'yellow',marginTop:'5px'}}>ShopEasy</h2>
        </div>
        {drawerItems}
      </Drawer>

      {/* Temporary Drawer for mobile screens */}
      <Drawer
        variant="temporary"
        open={isMobileOpen}
        onClose={toggleMobileMenu}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250, backgroundColor: '#1976d2' },
        }}
      >
        {drawerItems}
      </Drawer>
    </div>
  );
};

export default NewNav2;
