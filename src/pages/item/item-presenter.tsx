import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Typography } from '@mui/material';
import useEnhancedEffect from '@mui/material/utils/useEnhancedEffect';

import { AddItem, ItemSliderContainer, LoadingState } from 'components';
import { useWindowDimensions } from 'utils/getWindowDimensions';
import { CartType, PagesContext } from 'pages/PageProvider';
import { useAppDispatch, useAppSelector } from 'hooks';
import { onGetItemById, onGetItemByIdClear } from 'core/redux/reducers';
import ProductDescription from 'components/ProductDescription';
import { GetItemType } from 'utils/getItemType';
import { AddBundle } from 'components/AddBundle';

export enum SubmitButtonName {
  ADD_TO_CART = 'Adicionar',
  RETURN = 'Voltar',
  ATT_CART = 'Atualizar'
}

const ItemPresenter: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { cart, updateCart } = useContext(PagesContext);

  const windowDimensions = useWindowDimensions();
  const fullUrl = window.location.pathname.replace('/', '');
  let product_slug: string = '';

  if (fullUrl.includes('p/')) {
    product_slug = fullUrl.replace('p/', '');
  } else if (fullUrl.includes('k/')) {
    product_slug = fullUrl.replace('k/', '');
  }

  const [kitPrice, setKitPrice] = useState<number>(0);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [submitButton, setSubmitButton] = useState<SubmitButtonName>(
    SubmitButtonName.ADD_TO_CART
  );

  const { getItemById, getItemByIdError } = useAppSelector(
    (state) => state.getItemById
  );

  useEnhancedEffect(() => {
    if (product_slug) {
      dispatch(onGetItemById({ slug: product_slug }));
    }
  }, [product_slug]);

  const formatePrice = (value: number) => {
    return value.toPrecision(4).toString().replace('.', ',');
  };

  const productId =
    getItemById && getItemById.data.length !== 0 && getItemById.data[0].id;

  const existingItem = cart.items.find((item) => item.id === productId);

  const handleAddToCart = (
    total: number,
    id: string,
    att: boolean,
    imgSrc: string,
    itemName: string,
    price: number,
    comentary?: string
  ) => {
    if (submitButton === SubmitButtonName.RETURN) {
      dispatch(onGetItemByIdClear());
      navigate('/');
      return;
    }

    const newItem: CartType = {
      total,
      id,
      imgUrl: imgSrc,
      name: itemName,
      price: price.toString(),
      commentary: comentary ? comentary : ''
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

    if (fullUrl.includes('k/')) {
      dispatch(onGetItemByIdClear());
      navigate('/');
      return;
    }
  };

  const handleAddBundleToCart = (
    total: number,
    id: string,
    imgSrc: string,
    itemName: string,
    price: number,
    commentary: string
  ) => {
    const newItem: CartType = {
      total,
      id,
      imgUrl: imgSrc,
      name: itemName,
      price: price.toString(),
      commentary: commentary
    };

    const existingItemIndex = cart.items.findIndex((item) => item.id === id);

    if (existingItemIndex !== -1) {
      cart.items.splice(existingItemIndex, 1);
    }

    cart.items.push(newItem);
    updateCart({ ...cart });

    dispatch(onGetItemByIdClear());
    navigate('/');
  };

  const findItemInCart = cart.items.find(
    (item) => item.id === (getItemById && getItemById.data[0].id)
  );

  useEnhancedEffect(() => {
    if (findItemInCart) {
      setTotalItems(findItemInCart.total);
    }
  }, [getItemById]);

  useEnhancedEffect(() => {
    if (findItemInCart) {
      if (findItemInCart.total === totalItems) {
        setSubmitButton(SubmitButtonName.RETURN);
      } else if (findItemInCart.total !== totalItems) {
        setSubmitButton(SubmitButtonName.ATT_CART);
      }
    }
  }, [totalItems]);

  if (!getItemById) {
    return <LoadingState />;
  } else if (getItemByIdError) {
    return (
      <Box>
        <Typography>Erro ao abrir item</Typography>
      </Box>
    );
  } else if (getItemById.data.length !== 0) {
    return (
      <Box
        sx={{
          m: 2,
          bgcolor: 'background.paper',
          mt: 10,
          position: 'relative',
          borderRadius: 2,
          mb: 10
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            p: 3,
            justifyContent: 'center'
          }}
        >
          <Box sx={{ flexGrow: 1, maxWidth: '300px', mb: 2 }}>
            <ItemSliderContainer imgSrcs={getItemById.data[0].images} />
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              flexBasis: '200px',
              mt: 2,
              ml: 2
            }}
          >
            <Typography variant="h3">{getItemById.data[0].name}</Typography>

            {getItemById.data[0].brand && (
              <Typography variant="body1">
                {getItemById.data[0].brand}
              </Typography>
            )}

            <Box display="flex" flexDirection="row" alignItems="center" mt={1}>
              {GetItemType(getItemById.data[0].item_type) === 'p' ? (
                <Typography
                  fontWeight="bold"
                  color={
                    getItemById.data[0].prices[0].promo_price
                      ? 'error'
                      : 'black'
                  }
                >
                  {getItemById.data[0].prices[0].promo_price
                    ? `R$ ${formatePrice(
                        getItemById.data[0].prices[0].promo_price
                      )}`
                    : `R$ ${formatePrice(getItemById.data[0].prices[0].price)}`}
                </Typography>
              ) : (
                <Typography fontWeight="bold" color={'black'}>
                  R$ {formatePrice(kitPrice)}
                </Typography>
              )}

              <Typography
                ml={1}
                color={
                  getItemById.data[0].prices[0].promo_price ? 'error' : 'black'
                }
              >
                /uni
              </Typography>

              {getItemById.data[0].prices[0].promo_price && (
                <Typography
                  fontWeight="bold"
                  color="gray"
                  ml="1rem"
                  fontSize="0.75rem"
                  sx={{ textDecoration: 'line-through' }}
                >{`R$ ${formatePrice(
                  getItemById.data[0].prices[0].price
                )}`}</Typography>
              )}
            </Box>

            {GetItemType(getItemById.data[0].item_type) === 'p' ? (
              <>
                <AddItem
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
                  getItemById={getItemById}
                  handleAddToCart={handleAddToCart}
                  submitButton={submitButton}
                  windowDimensions={windowDimensions}
                />
              </>
            ) : (
              <AddBundle
                bundles={
                  getItemById.data[0].bundles ? getItemById.data[0].bundles : []
                }
                setKitPrice={setKitPrice}
                submitKit={handleAddBundleToCart}
                kit_id={getItemById.data[0].id}
                kit_img={getItemById.data[0].images[0]}
                kit_name={getItemById.data[0].name}
              />
            )}
          </Box>
        </Box>

        <Box pl={3} pr={3} pb={4}>
          <Typography variant="h4" mb={2}>
            Descrição do Produto
          </Typography>

          <Typography variant="body2" mb={5} sx={{ lineBreak: 'auto' }}>
            {getItemById.data[0].description && (
              <ProductDescription
                description={getItemById.data[0].description}
              />
            )}
          </Typography>

          <Typography variant="caption" sx={{ lineBreak: 'auto' }}>
            Informações sobre o produto ou embalagem apresentada pode não ser
            atual ou completo. Sempre consulte o produto físico para as
            informações mais precisas e avisos. Para obter informações
            adicionais, entre em contato com o revendedor ou fabricante.
          </Typography>
        </Box>
      </Box>
    );
  } else {
    return (
      <Box>
        <Typography>Item não encontrado</Typography>
      </Box>
    );
  }
};

export default ItemPresenter;
