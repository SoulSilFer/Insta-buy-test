import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Toolbar, Typography } from '@mui/material';
import { ShoppingCartRounded } from '@mui/icons-material';
import useEnhancedEffect from '@mui/material/utils/useEnhancedEffect';

import { PagesContext } from 'pages';
import { useAppDispatch } from 'hooks';
import { onGetItemByIdClear } from 'core/redux/reducers';

type Props = {
  setOpenCartDrawer: (value: React.SetStateAction<boolean>) => void;
};

export const Topbar: React.FC<Props> = ({ setOpenCartDrawer }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [totalItemsInCart, setTotalItemsInCart] = useState<number>(0);

  const { cart } = useContext(PagesContext);

  useEnhancedEffect(() => {
    const totalItems = cart.items.reduce(
      (total, item) => total + item.total,
      0
    );

    setTotalItemsInCart(totalItems);
  }, [cart]);

  const goToHome = () => {
    dispatch(onGetItemByIdClear());
    navigate('/');
  };

  return (
    <Toolbar
      variant="regular"
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        borderBottom: '1px solid #d1d1d1',
        position: 'fixed',
        bgcolor: 'background.paper',
        width: '100%',
        zIndex: 99999,
        top: 0
      }}
    >
      <Box display="flex" alignItems="center" flexDirection="row">
        <Box
          component="img"
          src="https://ibassets.com.br/ib.store.image.medium/m-0cd410fa3a4844acb4294a0edfea3822.png"
          sx={{ height: '3.125rem', width: '3.125rem', cursor: 'pointer' }}
          p={1}
          onClick={goToHome}
        />

        <Typography variant="body1">Supermercado Modelo</Typography>
      </Box>

      <Box
        borderRadius="35px"
        sx={{
          height: '2rem',
          width: '4rem',
          cursor: 'pointer',
          backgroundColor: '#49cb2b',

          '&:hover': {
            backgroundColor: '#42b328!important'
          }
        }}
        display="flex"
        alignItems="center"
        justifyContent="center"
        onClick={() => setOpenCartDrawer(true)}
      >
        <ShoppingCartRounded sx={{ fill: 'white' }} />

        <Typography color="primary.contrastText">{totalItemsInCart}</Typography>
      </Box>
    </Toolbar>
  );
};
