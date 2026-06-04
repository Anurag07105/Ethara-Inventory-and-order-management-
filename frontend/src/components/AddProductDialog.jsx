import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box } from '@mui/material';
import { useCreateProduct } from '../hooks/useProducts';

export default function AddProductDialog({ open, onClose }) {
  const [formData, setFormData] = useState({
    sku: '',
    name: '',
    description: '',
    price: '',
    stock_quantity: ''
  });
  
  const createMutation = useCreateProduct();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createMutation.mutate({
      sku: formData.sku,
      name: formData.name,
      description: formData.description || null,
      price: parseFloat(formData.price),
      stock_quantity: parseInt(formData.stock_quantity, 10)
    }, {
      onSuccess: () => {
        setFormData({ sku: '', name: '', description: '', price: '', stock_quantity: '' });
        onClose();
      }
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New Product</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField required label="SKU" name="sku" value={formData.sku} onChange={handleChange} fullWidth />
            <TextField required label="Name" name="name" value={formData.name} onChange={handleChange} fullWidth />
            <TextField label="Description" name="description" value={formData.description} onChange={handleChange} fullWidth multiline rows={3} />
            <TextField required label="Price" name="price" type="number" inputProps={{ min: 0.01, step: "0.01" }} value={formData.price} onChange={handleChange} fullWidth />
            <TextField required label="Stock Quantity" name="stock_quantity" type="number" inputProps={{ min: 0 }} value={formData.stock_quantity} onChange={handleChange} fullWidth />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" disabled={createMutation.isPending}>
            {createMutation.isPending ? 'Adding...' : 'Add Product'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
