import React, { useState } from 'react';

import { Box, Button, IconButton, Typography } from '@mui/material';
import useEnhancedEffect from '@mui/material/utils/useEnhancedEffect';
import {
  Add,
  ArrowBack,
  ArrowForward,
  Delete,
  Remove
} from '@mui/icons-material';

import { FullItemBundles } from 'core/entities';

type Props = {
  bundles: FullItemBundles[];
  setKitPrice: React.Dispatch<React.SetStateAction<number>>;
  submitKit: (
    total: number,
    id: string,
    imgSrc: string,
    itemName: string,
    price: number,
    comentary: string
  ) => void;
  kit_id: string;
  kit_img: string;
  kit_name: string;
};

type Item = {
  id: string;
  name: string;
  price: number;
  image: string;
  qtd: number;
  parent: string;
};

export const AddBundle: React.FC<Props> = ({
  kit_name,
  kit_id,
  kit_img,
  bundles,
  setKitPrice,
  submitKit
}) => {
  const [selectArray, setSelectArray] = useState<number>(0);
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const [resume, setResume] = useState<boolean>(false);
  const [qtdToCart, setQtdToCart] = useState<number>(1);

  const selectedBundle = bundles[selectArray];

  const handleAddToCart = (
    id: string,
    name: string,
    price: number,
    image: string,
    qtd: number,
    parent: string
  ) => {
    const existingItemIndex = selectedItems.findIndex((item) => item.id === id);

    if (existingItemIndex !== -1) {
      const existingItem = selectedItems[existingItemIndex];
      const updatedItem = {
        ...existingItem,
        name,
        price,
        image,
        qtd: existingItem.qtd + qtd,
        parent
      };

      const updatedItems = [...selectedItems];
      updatedItems[existingItemIndex] = updatedItem;

      setSelectedItems(updatedItems);
    } else {
      const newItem = {
        id,
        name,
        price,
        image,
        qtd,
        parent
      };
      setSelectedItems([...selectedItems, newItem]);
    }
  };

  const getItemQtd = (id: string) => {
    const selectedItem = selectedItems.find((item) => item.id === id);
    return selectedItem ? selectedItem.qtd : 0;
  };

  const getItemParentQtd = (parent: string) => {
    const parentItems = selectedItems.filter((item) => item.parent === parent);
    const totalQtd = parentItems.reduce((sum, item) => sum + item.qtd, 0);
    return totalQtd;
  };

  const sumPrices = () => {
    const totalPrices = selectedItems.reduce(
      (sum, item) => sum + item.price * item.qtd,
      0
    );
    return totalPrices;
  };

  useEnhancedEffect(() => {
    setKitPrice(sumPrices());
  }, [selectedItems]);

  const returnItemsByParent = (parent: string) => {
    return selectedItems.filter((item) => item.parent === parent);
  };

  const customCssIconButton = {
    bgcolor: 'primary.main',
    color: 'primary.contrastText',
    borderRadius: 1,
    height: '100%',
    width: '20%',

    '&:hover': {
      bgcolor: 'primary.dark'
    }
  };

  const finalSubmmit = () => {
    let description: string[] = [];

    for (const item of selectedItems) {
      let obj = `${item.qtd}X ${item.name}`;

      description.push(obj);
    }

    submitKit(
      qtdToCart,
      kit_id,
      kit_img,
      kit_name,
      sumPrices(),
      description.join(', ')
    );
  };

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        border="1px solid #d6d6d6"
        rowGap={1}
        mt={1}
        mb={1}
        p={1}
        borderRadius={2}
      >
        {!resume ? (
          <>
            <Box display="flex" justifyContent="space-between">
              <Typography>Selecione os itens:</Typography>

              <Typography>
                Passo {selectArray + 1} de {bundles.length}
              </Typography>
            </Box>

            <Box
              display="flex"
              justifyContent="space-between"
              sx={{
                '& .MuiButton-root': {
                  textTransform: 'none'
                },
                '& .MuiButton-root.Mui-disabled': {
                  color: 'gray'
                }
              }}
            >
              <Button
                startIcon={<ArrowBack />}
                disabled={selectArray === 0}
                onClick={() => setSelectArray(selectArray - 1)}
              >
                Voltar
              </Button>

              <Button
                variant="contained"
                endIcon={<ArrowForward />}
                onClick={() => {
                  if (selectArray + 1 === bundles.length) {
                    setResume(true);
                    return;
                  }
                  setSelectArray(selectArray + 1);
                }}
                disabled={
                  getItemParentQtd(selectedBundle.name) >
                    selectedBundle.max_choice ||
                  getItemParentQtd(selectedBundle.name) <
                    selectedBundle.min_choice
                }
              >
                Avançar
              </Button>
            </Box>

            <Box
              display="flex"
              justifyContent="space-between"
              sx={{
                bgcolor: 'background.default',
                alignItems: 'center'
              }}
            >
              <Box display="flex" flexDirection="column">
                <Typography variant="h6">{selectedBundle.name}</Typography>

                <Typography>
                  Escolha de {selectedBundle.min_choice} a{' '}
                  {selectedBundle.max_choice}.
                </Typography>
              </Box>

              <Typography
                sx={{
                  bgcolor: '#222222',
                  color: 'white',
                  borderRadius: 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                  display: 'flex',
                  height: '2.5rem',
                  p: 1
                }}
              >
                Obrigatório
              </Typography>
            </Box>

            {selectedBundle.products.map((item, i) => (
              <Box display="flex" justifyContent="space-between" key={i}>
                <Typography>
                  {item.data.name}{' '}
                  <Typography color="red">
                    + R$ {item.additional_price}
                  </Typography>
                </Typography>

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
                  {getItemQtd(item.data.id) < 2 ? (
                    <IconButton
                      sx={{
                        bgcolor: 'background.default',
                        borderRadius: 1,

                        '&:hover': {
                          bgcolor: 'background.neutral'
                        }
                      }}
                      disabled={getItemQtd(item.data.id) === 0}
                      onClick={() =>
                        handleAddToCart(
                          item.data.id,
                          item.data.name,
                          item.additional_price,
                          item.data.images[0],
                          -getItemQtd(item.data.id),
                          selectedBundle.name
                        )
                      }
                    >
                      <Delete
                        color={
                          getItemQtd(item.data.id) === 0
                            ? 'secondary'
                            : 'primary'
                        }
                      />
                    </IconButton>
                  ) : (
                    <IconButton
                      sx={{
                        bgcolor: 'background.default',
                        borderRadius: 1,

                        '&:hover': {
                          bgcolor: 'background.neutral'
                        }
                      }}
                      disabled={getItemQtd(item.data.id) === 0}
                      onClick={() =>
                        handleAddToCart(
                          item.data.id,
                          item.data.name,
                          item.additional_price,
                          item.data.images[0],
                          -1,
                          selectedBundle.name
                        )
                      }
                    >
                      <Remove
                        color={
                          getItemQtd(item.data.id) === 0
                            ? 'secondary'
                            : 'primary'
                        }
                      />
                    </IconButton>
                  )}

                  <Typography>{getItemQtd(item.data.id)}</Typography>

                  <IconButton
                    sx={{
                      bgcolor: 'background.default',
                      borderRadius: 1,

                      '&:hover': {
                        bgcolor: 'background.neutral'
                      }
                    }}
                    onClick={() => {
                      handleAddToCart(
                        item.data.id,
                        item.data.name,
                        item.additional_price,
                        item.data.images[0],
                        1,
                        selectedBundle.name
                      );
                    }}
                    disabled={
                      getItemParentQtd(selectedBundle.name) >=
                      selectedBundle.max_choice
                    }
                  >
                    <Add
                      color={
                        getItemParentQtd(selectedBundle.name) >=
                        selectedBundle.max_choice
                          ? 'secondary'
                          : 'primary'
                      }
                    />
                  </IconButton>
                </Box>
              </Box>
            ))}
          </>
        ) : (
          <>
            {bundles.map((item, i) => (
              <Box key={i} display="flex" flexDirection="column" mb={2}>
                <Typography variant="h6" mb={1}>
                  {item.name}
                </Typography>

                {returnItemsByParent(item.name).map((productItem, is) => (
                  <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                    key={is}
                    alignItems="center"
                  >
                    <Box
                      display="flex"
                      flexDirection="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Box
                        component="img"
                        src={`https://ibassets.com.br/ib.item.image.small/s-${productItem.image}`}
                        width="3rem"
                      />

                      <Typography>{productItem.name}</Typography>
                    </Box>

                    <Box
                      bgcolor="background.neutral"
                      width="2rem"
                      borderRadius={1}
                      height="2rem"
                      justifyContent="center"
                      alignItems="center"
                      display="flex"
                    >
                      <Typography>{productItem.qtd}</Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            ))}
          </>
        )}
      </Box>

      {resume && (
        <Box display="flex" justifyContent="space-evenly">
          <Box width="40%" display="flex" justifyContent="space-around">
            <IconButton
              sx={{
                ...customCssIconButton
              }}
              disabled={qtdToCart === 1}
              onClick={() => setQtdToCart(qtdToCart - 1)}
            >
              <Remove />
            </IconButton>

            <Typography
              display="flex"
              justifyContent="center"
              alignItems="center"
              variant="h6"
              bgcolor="background.neutral"
              width="40%"
              borderRadius={1}
            >
              {qtdToCart}
            </Typography>

            <IconButton
              sx={{ ...customCssIconButton }}
              onClick={() => setQtdToCart(qtdToCart + 1)}
            >
              <Add />
            </IconButton>
          </Box>

          <Button
            sx={{
              width: '60%',
              textTransform: 'none'
            }}
            variant="contained"
            onClick={finalSubmmit}
          >
            Finalizar
          </Button>
        </Box>
      )}
    </>
  );
};
