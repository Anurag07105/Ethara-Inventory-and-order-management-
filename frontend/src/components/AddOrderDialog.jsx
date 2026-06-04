import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box, MenuItem, IconButton, Typography } from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import { useCreateOrder } from '../hooks/useOrders';
import { useCustomers } from '../hooks/useCustomers';
import { useProducts } from '../hooks/useProducts';

export default function AddOrderDialog({ open, onClose }) {
  const [customerId, setCustomerId] = useState('');
  const [items, setItems] = useState([{ product_id: '', quantity: 1 }]);
  
  const createMutation = useCreateOrder();
  
  const { data: customersData, isLoading: loadingCustomers } = useCustomers({ page: 1, pageSize: 100 });
  const { data: productsData, isLoading: loadingProducts } = useProducts({ page: 1, pageSize: 100 });
  
  const customers = customersData?.data?.items || [];
  const products = productsData?.data?.items || [];

  const handleAddItem = () => {
    setItems(prev => [...prev, { product_id: '', quantity: 1 }]);
  };

  const handleRemoveItem = (index) => {
    setItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleItemChange = (index, field, value) => {
    setItems(prev => {
      const newItems = [...prev];
      newItems[index][field] = value;
      return newItems;
    });
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => {
      if (!item.product_id) return total;
      const product = products.find(p => p.id === item.product_id);
      if (!product) return total;
      return total + (product.price * item.quantity);
    }, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customerId || items.some(i => !i.product_id || i.quantity < 1)) {
      alert("Please fill all required fields correctly.");
      return;
    }
    
    createMutation.mutate({
      customer_id: customerId,
      items: items.map(item => ({
        product_id: item.product_id,
        quantity: parseInt(item.quantity, 10)
      }))
    }, {
      onSuccess: () => {
        setCustomerId('');
        setItems([{ product_id: '', quantity: 1 }]);
        onClose();
      }
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Create New Order</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField 
              select 
              required 
              label="Customer" 
              value={customerId} 
              onChange={e => setCustomerId(e.target.value)} 
              fullWidth
              disabled={loadingCustomers}
            >
              {loadingCustomers ? <MenuItem value="">Loading...</MenuItem> : null}
              {customers.map(c => (
                <MenuItem key={c.id} value={c.id}>{c.name} ({c.email})</MenuItem>
              ))}
            </TextField>
            
            <Typography variant="subtitle1" fontWeight={600}>Order Items</Typography>
            {items.map((item, index) => (
              <Box key={index} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <TextField
                  select
                  required
                  label="Product"
                  value={item.product_id}
                  onChange={e => handleItemChange(index, 'product_id', e.target.value)}
                  sx={{ flexGrow: 1 }}
                  disabled={loadingProducts}
                >
                  {products.map(p => (
                    <MenuItem key={p.id} value={p.id}>{p.name} - ${p.price}</MenuItem>
                  ))}
                </TextField>
                <TextField
                  required
                  type="number"
                  label="Quantity"
                  inputProps={{ min: 1 }}
                  value={item.quantity}
                  onChange={e => handleItemChange(index, 'quantity', e.target.value)}
                  sx={{ width: 100 }}
                />
                <IconButton onClick={() => handleRemoveItem(index)} disabled={items.length === 1} color="error">
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
            
            <Button startIcon={<AddIcon />} onClick={handleAddItem} sx={{ alignSelf: 'flex-start' }}>
              Add Another Item
            </Button>
            
            <Typography variant="h6" align="right" sx={{ mt: 2 }}>
              Total Preview: ${calculateTotal().toFixed(2)}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" disabled={createMutation.isPending || loadingCustomers || loadingProducts}>
            {createMutation.isPending ? 'Creating...' : 'Create Order'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
