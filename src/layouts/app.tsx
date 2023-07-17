import React, { useContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { Box, CssBaseline } from '@mui/material';

import { CartDrawer, Topbar } from 'components';
import { LocalStorage } from 'core/infra';
import { PagesContext } from 'pages';

export const AppLayout: React.FC = () => {
  const localStorage = new LocalStorage();

  const { cart, updateCart } = useContext(PagesContext);

  const [openCartDrawer, setOpenCartDrawer] = useState<boolean>(false);

  useEffect(() => {
    localStorage.set('cart', cart);
  }, [cart]);

  const localCart = localStorage.get('cart');

  useEffect(() => {
    if (localCart) {
      updateCart(localCart);
    }
  }, []);

  return (
    <Box sx={{ width: '100%' }}>
      <CssBaseline />

      <Topbar setOpenCartDrawer={setOpenCartDrawer} />

      <Box mt={6}>
        <Outlet />
      </Box>

      <CartDrawer
        open={openCartDrawer}
        onClose={() => setOpenCartDrawer(false)}
      />
    </Box>
  );
};
