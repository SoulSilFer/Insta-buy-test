import React, { useContext } from 'react';

import { Drawer, Box, Typography, Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

import { ItemCart } from 'components/ItemCart';
import { PagesContext } from 'pages';

type Props = {
  onClose: () => void;
  open: boolean;
};

export const CartDrawer: React.FC<Props> = ({ onClose, open }) => {
  const { cart, updateCart } = useContext(PagesContext);

  const handleClearAll = () => {
    updateCart({ items: [] });
  };

  const totalItemsFromCart = () => {
    let total = 0;

    cart.items.forEach((item) => {
      total += item.total;
    });

    return total;
  };

  const totalPriceFromCart = () => {
    let total = 0;
    cart.items.forEach((item) => {
      total += parseFloat(item.price);
    });

    return total;
  };

  return (
    <Drawer
      open={open}
      anchor="right"
      onClose={onClose}
      sx={{
        zIndex: 999999,
        '& .MuiDrawer-paper': {
          width: 350,
          boxSizing: 'border-box',
          bgcolor: 'background.default'
        }
      }}
    >
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        p={2}
        borderBottom="1px solid #d1d1d1"
        alignItems="center"
      >
        <ArrowBack onClick={onClose} cursor="pointer" />

        <Typography variant="subtitle1">Meu carrinho</Typography>

        <Button
          sx={{
            textTransform: 'none',
            borderRadius: 1,
            color: 'black',

            '&:hover': {
              bgcolor: '#cfcece'
            }
          }}
          onClick={handleClearAll}
        >
          Limpar
        </Button>
      </Box>

      <Box mb={6}>
        {cart.items.map((item, i) => (
          <ItemCart item={item} key={i} />
        ))}
      </Box>

      <Box
        bgcolor="primary.main"
        p={1}
        position="fixed"
        bottom={0}
        right={0}
        width={350}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h4" color="primary.contrastText">
          Total:
        </Typography>

        <Typography variant="h6" color="primary.contrastText">
          {totalItemsFromCart()}
        </Typography>

        <Typography variant="h6" color="primary.contrastText">
          {totalPriceFromCart().toFixed(2).replace('.', ',')}
        </Typography>
      </Box>
    </Drawer>
  );
};
