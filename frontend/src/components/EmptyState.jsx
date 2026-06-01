import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Add } from '@mui/icons-material';

export default function EmptyState({ title, description, actionLabel, onAction }) {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      py: 8,
      px: 2,
      textAlign: 'center'
    }}>
      <Box sx={{ 
        width: 80, 
        height: 80, 
        borderRadius: '50%', 
        bgcolor: '#F1F5F9',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mb: 3
      }}>
        <Typography sx={{ fontSize: 40 }}>📦</Typography>
      </Box>
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 400 }}>
        {description}
      </Typography>
      {actionLabel && (
        <Button 
          variant="contained" 
          startIcon={<Add />}
          onClick={onAction}
        >
          {actionLabel}
        </Button>
      )}
    </Box>
  );
}
