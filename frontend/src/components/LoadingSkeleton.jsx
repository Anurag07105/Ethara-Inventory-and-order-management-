import React from 'react';
import { Box, Skeleton, Stack, Paper } from '@mui/material';

export default function LoadingSkeleton({ count = 5, height = 100 }) {
  return (
    <Stack spacing={2}>
      {Array.from({ length: count }).map((_, i) => (
        <Paper key={i} elevation={0} sx={{ p: 2, borderRadius: 3, border: '1px solid #E2E8F0' }}>
          <Skeleton variant="rectangular" height={height} sx={{ borderRadius: 2 }} />
        </Paper>
      ))}
    </Stack>
  );
}
