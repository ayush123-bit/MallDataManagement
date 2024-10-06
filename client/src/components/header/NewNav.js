import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, InputBase, Box, Button, Avatar, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Search as SearchIcon, Menu as MenuIcon, ShoppingCart as ShoppingCartIcon, Message as MessageIcon, ListAlt as OrderIcon } from '@mui/icons-material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // For API call

// Styled Components
const LogoDiv = styled(Box)( {
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
});

const Logo = styled('img')({
  width: '40px',
  marginRight: '10px',
});

const LogoText = styled('h2')({
  color: '#FFD700',
  fontSize: '1.5rem',
  margin: 0,
});

const SearchBar = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#FFF',
  borderRadius: '5px',
  padding: '2px 10px',
  width: '400px',
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));

const StyledInputBase = styled(InputBase)( {
  width: '100%',
});

const LinksBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));

const StyledOrderButton = styled(Button)( {
  color: '#FFF',
  backgroundColor: '#4CAF50', // Green for Orders
  '&:hover': {
    backgroundColor: '#45A049',
  },
});

const StyledCartButton = styled(Button)( {
  color: '#FFF',
  backgroundColor: '#FF5722', // Orange for Cart
  '&:hover': {
    backgroundColor: '#FF3D00',
  },
});

const StyledMessageButton = styled(Button)( {
  color: '#FFF',
  backgroundColor: '#2196F3', // Blue for Message
  '&:hover': {
    backgroundColor: '#1976D2',
  },
});

const Navbar = styled(AppBar)( {
  backgroundColor: '#007BFF', // Blue background for the navbar
});

const NewNav = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // State for drawer
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      try {
        // Call search API
        const response = await axios.get(`https://mallback.onrender.com/search?query=${searchQuery}`);
        const results = response.data;

        // Pass the results to a search results page
        navigate('/search', { state: { results, query: searchQuery } });
      } catch (error) {
        console.error('Error searching products:', error);
      }
    }
  };

  const gotoOrders = () => {
    navigate('/orders');
    setIsDrawerOpen(false); // Close drawer after navigation
  };

  const gotoCarts = () => {
    navigate('/cart');
    setIsDrawerOpen(false); // Close drawer after navigation
  };

  const message = () => {
    navigate('/messageuser');
    setIsDrawerOpen(false); // Close drawer after navigation
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsDrawerOpen(open);
  };

  return (
    <Navbar position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Logo Section */}
        <LogoDiv onClick={() => navigate('/')}>
          <Logo src="/Assets/logo.png" alt="Logo" />
          <LogoText>ShopEasy</LogoText>
        </LogoDiv>

        {/* Search Bar */}
        <SearchBar component="form" onSubmit={handleSearchSubmit} sx={{ mx: 'auto' }}>
          <SearchIcon />
          <StyledInputBase
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </SearchBar>

        {/* Hamburger Icon for small screens */}
        <IconButton edge="end" color="inherit" onClick={toggleDrawer(true)} sx={{ display: { sm: 'none' } }}>
          <MenuIcon />
        </IconButton>

        {/* Links and User Profile */}
        <LinksBox>
          <StyledOrderButton startIcon={<OrderIcon />} onClick={gotoOrders}>
            Order
          </StyledOrderButton>
          <StyledCartButton startIcon={<ShoppingCartIcon />} onClick={gotoCarts}>
            Cart
          </StyledCartButton>
          <StyledMessageButton startIcon={<MessageIcon />} onClick={message}>
            Send Message
          </StyledMessageButton>
          <Avatar alt="User" src="/Assets/user.png" />
        </LinksBox>

        {/* Drawer for mobile view */}
        <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer(false)}>
          <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <List>
              <ListItem
                button
                onClick={gotoOrders}
                sx={{
                  backgroundColor: '#4CAF50', // Green for Orders
                  '&:hover': { backgroundColor: '#45A049' },
                  color: '#FFF',
                }}
              >
                <ListItemIcon sx={{ color: '#FFF' }}><OrderIcon /></ListItemIcon>
                <ListItemText primary="Order" />
              </ListItem>
              <ListItem
                button
                onClick={gotoCarts}
                sx={{
                  backgroundColor: '#FF5722', // Orange for Cart
                  '&:hover': { backgroundColor: '#FF3D00' },
                  color: '#FFF',
                }}
              >
                <ListItemIcon sx={{ color: '#FFF' }}><ShoppingCartIcon /></ListItemIcon>
                <ListItemText primary="Cart" />
              </ListItem>
              <ListItem
                button
                onClick={message}
                sx={{
                  backgroundColor: '#2196F3', // Blue for Message
                  '&:hover': { backgroundColor: '#1976D2' },
                  color: '#FFF',
                }}
              >
                <ListItemIcon sx={{ color: '#FFF' }}><MessageIcon /></ListItemIcon>
                <ListItemText primary="Send Message" />
              </ListItem>
            </List>
          </Box>
        </Drawer>
      </Toolbar>
    </Navbar>
  );
};

export default NewNav;
