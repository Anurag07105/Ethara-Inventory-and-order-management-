import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { DeleteOutline, EditOutlined } from '@mui/icons-material';

export default function CustomerTable({ customers = [], onDelete, onEdit }) {
  return (
    <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #E2E8F0', borderRadius: 3, overflow: 'hidden' }}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead sx={{ bgcolor: '#F8FAFC' }}>
          <TableRow>
            <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>Name</TableCell>
            <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>Email</TableCell>
            <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>Phone</TableCell>
            <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>Address</TableCell>
            <TableCell align="right" sx={{ fontWeight: 600, color: 'text.secondary' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                No customers found
              </TableCell>
            </TableRow>
          ) : (
            customers.map((row) => (
              <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { bgcolor: '#F8FAFC' }, transition: 'background-color 0.2s' }}>
                <TableCell sx={{ fontWeight: 500 }}>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.phone || '-'}</TableCell>
                <TableCell>{row.address || '-'}</TableCell>
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
