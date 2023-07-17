import React from 'react';

import { Box, IconButton, Typography, styled } from '@mui/material';
import { Add, Delete, Remove } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';

import { SubmitButtonName } from 'pages/item/item-presenter';
import { GetItemByIdSuccess } from 'core/entities';

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  padding: 0,
  borderRadius: '1px',

  '& .MuiSvgIcon-root': {
    color: theme.palette.text.primary
  },

  '&:hover': {
    backgroundColor: theme.palette.primary.dark
  }
}));

type Props = {
  totalItems: number;
  handleSubmit: () => void;
  setTotalItems: (value: React.SetStateAction<number>) => void;
  submitButtonName: SubmitButtonName;
};

const AddItemFooter: React.FC<Props> = ({
  handleSubmit,
  totalItems,
  setTotalItems,
  submitButtonName
}) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        zIndex: 9999,
        width: '100%',
        borderTop: '0.1px solid',
        borderColor: 'gray',
        display: 'flex',
        alignItems: 'center',
        p: '0.5rem'
      }}
      bgcolor="background.default"
    >
      <Box
        sx={{
          borderColor: 'gray',
          borderRadius: '2px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
        bgcolor="background.paper"
        width="40%"
        ml={3}
      >
        <StyledIconButton disabled={totalItems === 0}>
          {totalItems < 2 ? (
            <Delete onClick={() => setTotalItems(0)} />
          ) : (
            <Remove onClick={() => setTotalItems(totalItems - 1)} />
          )}
        </StyledIconButton>

        {totalItems}

        <StyledIconButton>
          <Add onClick={() => setTotalItems(totalItems + 1)} />
        </StyledIconButton>
      </Box>

      <LoadingButton
        variant="contained"
        sx={{ textTransform: 'none', ml: 2 }}
        fullWidth
        onClick={handleSubmit}
      >
        {submitButtonName}
      </LoadingButton>
    </Box>
  );
};

type AddItemProps = {
  totalItems: number;
  handleSubmit: () => void;
  setTotalItems: (value: React.SetStateAction<number>) => void;
  submitButtonName: SubmitButtonName;
  windowDimensions: {
    width: number;
    height: number;
  };
  handleAddToCart: (
    total: number,
    id: string,
    att: boolean,
    imgSrc: string,
    itemName: string,
    price: number
  ) => void;
  getItemById: GetItemByIdSuccess;
  submitButton: SubmitButtonName;
};

export const AddItem: React.FC<AddItemProps> = ({
  totalItems,
  setTotalItems,
  windowDimensions,
  handleAddToCart,
  getItemById,
  submitButton
}) => {
  return (
    <>
      {windowDimensions.width >= 639 ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start'
          }}
          mt={1}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              width: '50%',
              justifyContent: 'space-between',
              maxWidth: '7.5rem'
            }}
          >
            <IconButton
              sx={{
                bgcolor: 'background.default',
                borderRadius: 1
              }}
              disabled={totalItems === 0}
            >
              {totalItems < 2 ? (
                <Delete
                  onClick={() => setTotalItems(0)}
                  color={totalItems === 0 ? 'secondary' : 'primary'}
                />
              ) : (
                <Remove
                  onClick={() => setTotalItems(totalItems - 1)}
                  color={totalItems === 0 ? 'secondary' : 'primary'}
                />
              )}
            </IconButton>

            <Typography>{totalItems}</Typography>

            <IconButton
              sx={{
                bgcolor: 'background.default',
                borderRadius: 1
              }}
              onClick={() => setTotalItems(totalItems + 1)}
            >
              <Add color="primary" />
            </IconButton>
          </Box>

          <LoadingButton
            variant="contained"
            sx={{ textTransform: 'none', ml: 4 }}
            onClick={() =>
              handleAddToCart(
                totalItems,
                getItemById.data[0].id,
                submitButton === SubmitButtonName.ATT_CART,
                getItemById.data[0].images[0],
                getItemById.data[0].name,
                getItemById.data[0].prices[0].promo_price
                  ? getItemById.data[0].prices[0].promo_price
                  : getItemById.data[0].prices[0].price
              )
            }
          >
            {submitButton}
          </LoadingButton>
        </Box>
      ) : (
        <AddItemFooter
          handleSubmit={() =>
            handleAddToCart(
              totalItems,
              getItemById.data[0].id,
              submitButton === SubmitButtonName.ATT_CART,
              getItemById.data[0].images[0],
              getItemById.data[0].name,
              getItemById.data[0].prices[0].promo_price
                ? getItemById.data[0].prices[0].promo_price
                : getItemById.data[0].prices[0].price
            )
          }
          totalItems={totalItems}
          setTotalItems={setTotalItems}
          submitButtonName={submitButton}
        />
      )}
    </>
  );
};
