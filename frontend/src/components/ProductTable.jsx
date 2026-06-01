import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Chip } from '@mui/material';
import { DeleteOutline, EditOutlined } from '@mui/icons-material';

export default function ProductTable({ products = [], onDelete }) {
  return (
    <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #E2E8F0', borderRadius: 3, overflow: 'hidden' }}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead sx={{ bgcolor: '#F8FAFC' }}>
          <TableRow>
            <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>SKU</TableCell>
            <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>Name</TableCell>
            <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>Price</TableCell>
            <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>Stock</TableCell>
            <TableCell align="right" sx={{ fontWeight: 600, color: 'text.secondary' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((row) => (
            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { bgcolor: '#F8FAFC' }, transition: 'background-color 0.2s' }}>
              <TableCell sx={{ fontWeight: 500 }}>{row.sku}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>${parseFloat(row.price).toFixed(2)}</TableCell>
              <TableCell>
                <Chip 
                  label={row.stock_quantity} 
                  size="small" 
                  color={row.stock_quantity > 10 ? 'success' : row.stock_quantity > 0 ? 'warning' : 'error'} 
                  sx={{ fontWeight: 600, borderRadius: 1.5 }}
                />
              </TableCell>
              <TableCell align="right">
                <IconButton size="small" color="primary"><EditOutlined fontSize="small" /></IconButton>
                <IconButton size="small" color="error" onClick={() => onDelete(row.id)}><DeleteOutline fontSize="small" /></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}