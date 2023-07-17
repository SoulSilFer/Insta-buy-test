import React, { useEffect, useState } from 'react';

import { Box, Button, Container } from '@mui/material';
import { Add } from '@mui/icons-material';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { useAppDispatch, useAppSelector } from 'hooks';
import { onGetLayout } from 'core/redux/reducers/get-layout.reducer';
import { Banner, SliderContainer, SliderContainerPromo } from 'components';

const HomePresenter: React.FC = () => {
  const dispatch = useAppDispatch();

  const [selectArray, setSelectArray] = useState<number>(5);

  useEffect(() => {
    dispatch(onGetLayout());
  }, []);

  const { getLayout } = useAppSelector((state) => state.getLayout);

  const chunkSize = selectArray;
  const array =
    getLayout && getLayout.data.collection_items
      ? getLayout.data.collection_items
      : [];

  const dividedArray = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    const chunk = array.slice(i, i + chunkSize);
    dividedArray.push(chunk);
  }

  return (
    <Container sx={{ p: 3 }}>
      {getLayout && getLayout.data && getLayout.data.collection_items && (
        <>
          <Banner imgSrc={getLayout.data.banners.map((itme) => itme.image)} />

          {getLayout.data.promo && (
            <SliderContainerPromo promoItems={getLayout.data.promo} />
          )}

          {dividedArray[0].map((item, index) => (
            <SliderContainer
              collection_items={item.items}
              mainTitle={item.title}
              key={index}
            />
          ))}

          <Box display="flex" justifyContent="center">
            <Button
              onClick={() => setSelectArray(selectArray + 5)}
              disabled={dividedArray.length === 1}
              sx={{
                textTransform: 'none',
                mt: 5,
                mb: 5
              }}
              variant="contained"
              startIcon={<Add />}
            >
              Carregar mais
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
};

export default HomePresenter;
