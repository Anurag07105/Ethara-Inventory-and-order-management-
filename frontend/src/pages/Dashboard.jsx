import React from 'react';
import { Box, Grid, Paper, Typography, Skeleton } from '@mui/material';
import { useDashboardStats } from '../hooks/useDashboard';

const StatCard = ({ title, value, color, loading }) => (
  <Paper elevation={0} sx={{ p: 3, borderRadius: 4, border: '1px solid #E2E8F0', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.05)' } }}>
    <Typography variant="subtitle2" color="text.secondary" fontWeight={600} gutterBottom>
      {title}
    </Typography>
    {loading ? (
      <Skeleton variant="text" width="60%" height={48} />
    ) : (
      <Typography variant="h4" color={color} fontWeight={700}>
        {value}
      </Typography>
    )}
  </Paper>
);

export default function Dashboard() {
  const { data, isLoading } = useDashboardStats();
  const stats = data?.data || {};

  return (
    <Box sx={{ animation: 'fadeIn 0.5s ease-in' }}>
      <Typography variant="h4" fontWeight={700} sx={{ mb: 4, letterSpacing: '-0.02em' }}>
        Overview
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Total Revenue" value={`$${parseFloat(stats.total_revenue || 0).toLocaleString()}`} color="primary.main" loading={isLoading} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Total Orders" value={stats.total_orders || 0} color="text.primary" loading={isLoading} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Total Products" value={stats.total_products || 0} color="text.primary" loading={isLoading} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Total Customers" value={stats.total_customers || 0} color="text.primary" loading={isLoading} />
        </Grid>
      </Grid>
    </Box>
  );
}