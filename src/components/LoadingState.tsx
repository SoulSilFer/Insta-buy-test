import React from 'react';

import { Box } from '@mui/material';

export const LoadingState: React.FC = () => {
  return (
    <Box
      width="100%"
      height="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <img
        src="static/loading.svg"
        alt="s"
        width="50%"
        style={{
          mixBlendMode: 'darken'
        }}
      />
    </Box>
  );
};
