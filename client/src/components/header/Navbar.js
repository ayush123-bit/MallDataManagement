import React from 'react';
import { AppBar, Toolbar, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { styled } from '@mui/system';

// Styled components using Material UI's styled API
const LogoDiv = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
}));

const Logo = styled('img')({
  width: '40px',
  marginRight: '10px',
});

const LogoText = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 'bold',
  color: '#FFD700', // Yellow color for the text
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.2rem',
  },
}));

const ButtonGroup = styled(Box)(({ theme }) => ({
  marginLeft: 'auto',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    gap: '5px',
  },
}));

// Styled buttons with individual colors
const SignInButton = styled(Button)(({ theme }) => ({
  color: '#FFF',
  backgroundColor: '#4CAF50', // Green for Sign In
  '&:hover': {
    backgroundColor: '#388E3C',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.8rem',
    padding: '5px 10px',
  },
}));

const SignUpButton = styled(Button)(({ theme }) => ({
  color: '#FFF',
  backgroundColor: '#FF5722', // Orange for Sign Up
  '&:hover': {
    backgroundColor: '#E64A19',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.8rem',
    padding: '5px 10px',
  },
}));

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/enter', { state: { message: 'login' } });
  };

  const handleSignup = () => {
    navigate('/enter', { state: { message: 'sign' } });
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#007BFF', padding: '10px 0' }}>
      <Toolbar>
        <LogoDiv onClick={() => navigate('/')}>
          <Logo src="/Assets/logo.png" alt="Logo" />
          <LogoText variant="h6">ShopEasy</LogoText>
        </LogoDiv>
        <ButtonGroup>
          <SignInButton
            variant="contained"
            startIcon={<LoginIcon />}
            onClick={handleLogin}
          >
            Sign In
          </SignInButton>
          <SignUpButton
            variant="contained"
            startIcon={<PersonAddIcon />}
            onClick={handleSignup}
          >
            Sign Up
          </SignUpButton>
        </ButtonGroup>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
