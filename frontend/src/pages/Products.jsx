import React, { useState } from 'react';
import { Box, Typography, Button, TextField, InputAdornment, Paper } from '@mui/material';
import { Search, Add } from '@mui/icons-material';
import { useProducts, useDeleteProduct } from '../hooks/useProducts';
import ProductTable from '../components/ProductTable';

export default function Products() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  
  const { data, isLoading } = useProducts({ page, pageSize: 10, search });
  const deleteMutation = useDeleteProduct();

  const handleDelete = (id) => {
    if(window.confirm('Are you sure you want to delete this product?')) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <Box sx={{ animation: 'fadeIn 0.5s ease-in' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" fontWeight={700} sx={{ letterSpacing: '-0.02em' }}>
          Products
        </Typography>
        <Button variant="contained" startIcon={<Add />} sx={{ borderRadius: 2, px: 3, py: 1, textTransform: 'none', fontWeight: 600, boxShadow: 'none', '&:hover': { boxShadow: '0 4px 6px -1px rgb(79 70 229 / 0.4)' } }}>
          Add Product
        </Button>
      </Box>

      <Paper elevation={0} sx={{ p: 2, mb: 3, border: '1px solid #E2E8F0', borderRadius: 3, display: 'flex', gap: 2 }}>
        <TextField
          size="small"
          placeholder="Search products..."
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: <InputAdornment position="start"><Search fontSize="small" /></InputAdornment>,
            sx: { borderRadius: 2, bgcolor: '#F8FAFC' }
          }}
          sx={{ width: 300 }}
        />
      </Paper>

      {isLoading ? <Typography>Loading...</Typography> : <ProductTable products={data?.data?.items || []} onDelete={handleDelete} />}
    </Box>
  );
}