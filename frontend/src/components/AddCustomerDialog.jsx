import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box } from '@mui/material';
import { useCreateCustomer } from '../hooks/useCustomers';

export default function AddCustomerDialog({ open, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  
  const createMutation = useCreateCustomer();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createMutation.mutate({
      name: formData.name,
      email: formData.email,
      phone: formData.phone || null,
      address: formData.address || null
    }, {
      onSuccess: () => {
        setFormData({ name: '', email: '', phone: '', address: '' });
        onClose();
      }
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New Customer</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField required label="Name" name="name" value={formData.name} onChange={handleChange} fullWidth />
            <TextField required label="Email" name="email" type="email" value={formData.email} onChange={handleChange} fullWidth />
            <TextField label="Phone" name="phone" value={formData.phone} onChange={handleChange} fullWidth />
            <TextField label="Address" name="address" value={formData.address} onChange={handleChange} fullWidth multiline rows={2} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" disabled={createMutation.isPending}>
            {createMutation.isPending ? 'Adding...' : 'Add Customer'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
