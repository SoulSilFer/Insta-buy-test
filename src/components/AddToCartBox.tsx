import React from 'react';

import { Box, IconButton, Typography } from '@mui/material';
import { Add, Delete, Remove } from '@mui/icons-material';

type Props = {
  handleAddToCart: (total: number, att: boolean) => void;
  totalItems: number;
};

export const AddToCartBox: React.FC<Props> = ({
  handleAddToCart,
  totalItems
}) => {
  const hasItems = totalItems !== 0;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: '8rem',
        minWidth: '8rem',
        bgcolor: 'background.default'
      }}
    >
      <IconButton
        sx={{
          bgcolor: 'background.default',
          borderRadius: 1,

          '&:hover': {
            bgcolor: 'background.neutral'
          }
        }}
        disabled={totalItems === 0}
      >
        {totalItems < 2 ? (
          <Delete
            onClick={() => handleAddToCart(0, hasItems)}
            color={totalItems === 0 ? 'secondary' : 'primary'}
          />
        ) : (
          <Remove
            onClick={() => handleAddToCart(totalItems - 1, hasItems)}
            color={totalItems === 0 ? 'secondary' : 'primary'}
          />
        )}
      </IconButton>

      <Typography>{totalItems}</Typography>

      <IconButton
        sx={{
          bgcolor: 'background.default',
          borderRadius: 1,

          '&:hover': {
            bgcolor: 'background.neutral'
          }
        }}
        onClick={() => handleAddToCart(totalItems + 1, hasItems)}
      >
        <Add color="primary" />
      </IconButton>
    </Box>
  );
};
