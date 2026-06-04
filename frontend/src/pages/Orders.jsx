import React, { useState } from 'react';
import { Box, Typography, Button, TextField, InputAdornment, MenuItem } from '@mui/material';
import { Search, Add } from '@mui/icons-material';
import { useOrders, useDeleteOrder, useUpdateOrderStatus } from '../hooks/useOrders';
import OrderTable from '../components/OrderTable';
import AddOrderDialog from '../components/AddOrderDialog';

const ORDER_STATUSES = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];

export default function Orders() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [openAddDialog, setOpenAddDialog] = useState(false);
  
  const params = { page, pageSize: 10, search, status: statusFilter || undefined };
  const { data, isLoading } = useOrders(params);
  const deleteMutation = useDeleteOrder();
  const updateStatusMutation = useUpdateOrderStatus();

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleStatusChange = (id, newStatus) => {
    updateStatusMutation.mutate({ id, status: newStatus });
  };

  return (
    <Box sx={{ animation: 'fadeIn 0.5s ease-in' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" fontWeight={700} sx={{ letterSpacing: '-0.02em' }}>
          Orders
        </Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => setOpenAddDialog(true)} sx={{ borderRadius: 2, px: 3, py: 1, textTransform: 'none', fontWeight: 600, boxShadow: 'none', '&:hover': { boxShadow: '0 4px 6px -1px rgb(79 70 229 / 0.4)' } }}>
          New Order
        </Button>
      </Box>

      <Box sx={{ p: 2, mb: 3, border: '1px solid #E2E8F0', borderRadius: 3, display: 'flex', gap: 2, bgcolor: '#FFFFFF' }}>
        <TextField
          size="small"
          placeholder="Search orders..."
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: <InputAdornment position="start"><Search fontSize="small" /></InputAdornment>,
          }}
          sx={{ width: 300 }}
        />
        <TextField
          select
          size="small"
          label="Status"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          sx={{ width: 150 }}
        >
          <MenuItem value="">All Status</MenuItem>
          {ORDER_STATUSES.map((status) => (
            <MenuItem key={status} value={status}>{status}</MenuItem>
          ))}
        </TextField>
      </Box>

      {isLoading ? <Typography>Loading...</Typography> : <OrderTable orders={data?.data?.items || []} onDelete={handleDelete} onStatusChange={handleStatusChange} />}
      <AddOrderDialog open={openAddDialog} onClose={() => setOpenAddDialog(false)} />
    </Box>
  );
}
