import React, { useState } from 'react';
import { Box, Typography, Button, TextField, InputAdornment } from '@mui/material';
import { Search, Add } from '@mui/icons-material';
import { useCustomers, useDeleteCustomer } from '../hooks/useCustomers';
import CustomerTable from '../components/CustomerTable';

export default function Customers() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  
  const { data, isLoading } = useCustomers({ page, pageSize: 10, search });
  const deleteMutation = useDeleteCustomer();

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <Box sx={{ animation: 'fadeIn 0.5s ease-in' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" fontWeight={700} sx={{ letterSpacing: '-0.02em' }}>
          Customers
        </Typography>
        <Button variant="contained" startIcon={<Add />} sx={{ borderRadius: 2, px: 3, py: 1, textTransform: 'none', fontWeight: 600, boxShadow: 'none', '&:hover': { boxShadow: '0 4px 6px -1px rgb(79 70 229 / 0.4)' } }}>
          Add Customer
        </Button>
      </Box>

      <Box sx={{ p: 2, mb: 3, border: '1px solid #E2E8F0', borderRadius: 3, display: 'flex', gap: 2, bgcolor: '#FFFFFF' }}>
        <TextField
          size="small"
          placeholder="Search customers..."
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: <InputAdornment position="start"><Search fontSize="small" /></InputAdornment>,
            sx: { borderRadius: 2, bgcolor: '#F8FAFC' }
          }}
          sx={{ width: 300 }}
        />
      </Box>

      {isLoading ? <Typography>Loading...</Typography> : <CustomerTable customers={data?.data?.items || []} onDelete={handleDelete} />}
    </Box>
  );
}
