import React from 'react';

import { Box, Typography } from '@mui/material';

import { CartType } from 'pages';

type Props = {
  item: CartType;
};

export const ItemCart: React.FC<Props> = ({ item }) => {
  return (
    <Box
      width="100%"
      bgcolor="background.paper"
      borderBottom="1px solid #d1d1d1"
      pl={1}
      display="flex"
      flexDirection="column"
    >
      <Box display="flex" justifyContent="space-around" alignItems="center">
        <Box display="flex" width="60%" alignItems="center">
          <Box
            component="img"
            src={`https://ibassets.com.br/ib.item.image.small/s-${item.imgUrl}`}
            width="70px"
          />

          <Typography sx={{ lineBreak: 'auto' }} variant="caption">
            {item.name}
          </Typography>
        </Box>

        <Box
          border="1px solid #d1d1d1"
          width="30px"
          height="30px"
          borderRadius={1}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="caption">{item.total}</Typography>
        </Box>

        <Typography fontWeight="bold" variant="caption">
          R$ {parseFloat(item.price).toFixed(2).replace('.', ',')}
        </Typography>
      </Box>

      {item.commentary && (
        <Typography variant="caption" color="#868686" fontSize="0.6rem" mb={1}>
          {item.commentary}
        </Typography>
      )}
    </Box>
  );
};
