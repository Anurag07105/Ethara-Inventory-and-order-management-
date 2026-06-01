import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';

const navItems = [
  { label: 'Dashboard', path: '/' },
  { label: 'Products', path: '/products' },
  { label: 'Customers', path: '/customers' },
  { label: 'Orders', path: '/orders' },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <AppBar position="sticky" elevation={0} sx={{ bgcolor: '#FFFFFF', borderBottom: '1px solid #E2E8F0' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ minHeight: '64px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 4 }}>
            <Box sx={{ width: 32, height: 32, bgcolor: 'primary.main', borderRadius: 2, mr: 1.5 }} />
            <Typography variant="h6" color="text.primary" sx={{ fontWeight: 700, letterSpacing: '-0.02em' }}>
              Nexus
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
              return (
                <Button
                  key={item.label}
                  component={NavLink}
                  to={item.path}
                  sx={{
                    color: isActive ? 'primary.main' : 'text.secondary',
                    bgcolor: isActive ? 'primary.50' : 'transparent',
                    fontWeight: isActive ? 600 : 500,
                    textTransform: 'none',
                    borderRadius: 2,
                    px: 2,
                    '&:hover': { bgcolor: isActive ? 'primary.50' : '#F1F5F9' },
                  }}
                >
                  {item.label}
                </Button>
              );
            })}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}