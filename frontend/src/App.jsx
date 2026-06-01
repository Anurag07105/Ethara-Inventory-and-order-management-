import React from 'react';
import { Box, Container } from '@mui/material';
import Navbar from './components/Navbar';
import AppRoutes from './routes/AppRoutes';

export default function App() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#F8FAFC' }}>
      <Navbar />
      <Box component="main" sx={{ flex: 1, py: 4 }}>
        <Container maxWidth="xl">
          <AppRoutes />
        </Container>
      </Box>
    </Box>
  );
}
