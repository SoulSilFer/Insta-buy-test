import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Typography } from '@mui/material';

import { CartType, PagesContext } from 'pages';
import { PopoverComp } from './Popover';
import { AddToCartBox } from './AddToCartBox';
import { GetItemType } from 'utils/getItemType';

type Props = {
  itemName: string;
  itemPrice: number;
  itemPromoPrice?: number;
  imgSrc: string;
  product_id: string;
  slug: string;
  itemType: 'product' | 'products_kit';
};

export const ItemCard: React.FC<Props> = ({
  itemName,
  itemPrice,
  itemPromoPrice,
  imgSrc,
  product_id,
  slug,
  itemType
}) => {
  const { updateCart, cart } = useContext(PagesContext);
  const navigate = useNavigate();

  const formatedImg = 'https://ibassets.com.br/ib.item.image.small/s-' + imgSrc;
  const existingItem = cart.items.find((item) => item.id === product_id);

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const formatePrice = (value: number) => {
    return value.toString().replace('.', ',');
  };

  const handleAddToCart = (total: number, att: boolean) => {
    const newItem: CartType = {
      total,
      id: product_id,
      imgUrl: imgSrc,
      commentary: '',
      name: itemName,
      price: itemPromoPrice ? itemPromoPrice.toString() : itemPrice.toString()
    };

    if (existingItem) {
      if (att) {
        existingItem.total = newItem.total;
      } else {
        existingItem.total += newItem.total;
      }
    } else {
      cart.items.push(newItem);
    }

    updateCart({ ...cart });
  };

  const customCss = {
    position: 'absolute',
    top: '0.3rem',
    right: '0.3rem',
    cursor: 'pointer',
    borderRadius: '50%',
    height: '2.2rem!important',
    width: '2.2rem!important',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    bgcolor: 'primary.main',
    filter: 'drop-shadow(0 0 5px rgba(0, 0, 0, 0.3))',
    transition: 'filter 0.3s',

    '&:hover': {
      filter: 'drop-shadow(0 0 5px rgba(0, 0, 0, 0.7))',
      bgcolor: 'primary.dark'
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const fomatedItemType = GetItemType(itemType);

  return (
    <Box
      sx={{
        maxWidth: '150px',
        cursor: 'pointer',
        position: 'relative'
      }}
    >
      {fomatedItemType === 'p' && (
        <>
          {existingItem && existingItem.total !== 0 ? (
            <Typography
              sx={{
                ...customCss
              }}
              color="primary.contrastText"
              onClick={handleClick}
            >
              {existingItem.total}
            </Typography>
          ) : (
            <Typography
              color="primary.contrastText"
              onClick={handleClick}
              sx={{
                ...customCss
              }}
            >
              +
            </Typography>
          )}
        </>
      )}

      <PopoverComp
        open={open}
        handleClose={handleClose}
        anchorEl={anchorEl}
        id={id}
      >
        <AddToCartBox
          handleAddToCart={handleAddToCart}
          totalItems={existingItem ? existingItem.total : 0}
        />
      </PopoverComp>

      <div
        onClick={() => navigate(`${fomatedItemType}/${slug}`, { state: slug })}
      >
        <img
          alt={imgSrc}
          src={formatedImg}
          style={{
            height: '10rem'
          }}
        />

        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          ml={1}
          mt={2}
        >
          <Typography
            fontWeight="bold"
            color={itemPromoPrice ? 'error' : 'black'}
          >{`R$ ${formatePrice(itemPrice)}`}</Typography>

          {itemPromoPrice && (
            <Typography
              fontWeight="bold"
              color="gray"
              ml="1rem"
              fontSize="0.75rem"
              sx={{ textDecoration: 'line-through' }}
            >{`R$ ${formatePrice(itemPromoPrice)}`}</Typography>
          )}
        </Box>

        <Typography color="gray" ml={1}>
          {itemName}
        </Typography>
      </div>
    </Box>
  );
};
