import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Chip } from '@mui/material';
import { DeleteOutline, EditOutlined } from '@mui/icons-material';

const STATUS_COLORS = {
  PENDING: 'warning',
  PROCESSING: 'info',
  SHIPPED: 'primary',
  DELIVERED: 'success',
  CANCELLED: 'error',
};

export default function OrderTable({ orders = [], onDelete, onEdit, onStatusChange }) {
  const getStatusColor = (status) => STATUS_COLORS[status] || 'default';

  return (
    <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #E2E8F0', borderRadius: 3, overflow: 'hidden' }}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead sx={{ bgcolor: '#F8FAFC' }}>
          <TableRow>
            <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>Order ID</TableCell>
            <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>Customer</TableCell>
            <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>Amount</TableCell>
            <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>Status</TableCell>
            <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>Created</TableCell>
            <TableCell align="right" sx={{ fontWeight: 600, color: 'text.secondary' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                No orders found
              </TableCell>
            </TableRow>
          ) : (
            orders.map((row) => (
              <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { bgcolor: '#F8FAFC' }, transition: 'background-color 0.2s' }}>
                <TableCell sx={{ fontWeight: 500 }}>#{row.id}</TableCell>
                <TableCell>{row.customer_id || '-'}</TableCell>
                <TableCell>${parseFloat(row.total_amount || 0).toFixed(2)}</TableCell>
                <TableCell>
                  <Chip 
                    label={row.status} 
                    size="small" 
                    color={getStatusColor(row.status)}
                    variant="outlined"
                    sx={{ fontWeight: 600, borderRadius: 1.5 }}
                  />
                </TableCell>
                <TableCell>{new Date(row.created_at).toLocaleDateString()}</TableCell>
                <TableCell align="right">
                  <IconButton size="small" color="primary" onClick={() => onEdit?.(row.id)}><EditOutlined fontSize="small" /></IconButton>
                  <IconButton size="small" color="error" onClick={() => onDelete(row.id)}><DeleteOutline fontSize="small" /></IconButton>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
