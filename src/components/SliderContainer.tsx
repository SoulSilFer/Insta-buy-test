import React from 'react';
import Slider from 'react-slick';

import { Box, Typography } from '@mui/material';
import { ArrowCircleLeft, ArrowCircleRight } from '@mui/icons-material';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { Items } from 'core/entities';
import { ItemCard } from 'components';

type Props = {
  mainTitle: string;
  collection_items: Items[];
};

export const SliderContainer: React.FC<Props> = ({
  mainTitle,
  collection_items
}) => {
  const settings = {
    infinite: true,
    slidesToShow: collection_items.length < 4 ? 1 : 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: collection_items.length > 4 ? 2 : 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <>
      <Box mt="2rem" bgcolor="background.paper" borderRadius={2} p={1}>
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="flex-start"
          mb={2}
        >
          <Typography variant="h3" ml={2}>
            {mainTitle}
          </Typography>
        </Box>

        <Slider
          {...settings}
          arrows
          centerMode
          prevArrow={
            <ArrowCircleLeft
              color="primary"
              sx={{
                position: 'absolute',
                height: '4rem',
                width: '4rem',
                zIndex: 9999,
                left: '0px',

                '&:hover': {
                  fill: '#388e3c'
                },

                '&:focus': {
                  fill: '#388e3c'
                }
              }}
            />
          }
          nextArrow={
            <ArrowCircleRight
              color="primary"
              sx={{
                position: 'absolute',
                height: '4rem',
                width: '4rem',
                right: '0px',

                '&:hover': {
                  fill: '#388e3c'
                },

                '&:focus': {
                  fill: '#388e3c'
                }
              }}
            />
          }
          draggable={false}
        >
          {collection_items.map((item, index) => (
            <ItemCard
              itemName={item.name}
              itemPrice={item.prices[0].price}
              itemPromoPrice={item.prices[0].promo_price}
              imgSrc={item.images[0]}
              key={index}
              product_id={item.id}
              slug={item.slug}
              itemType={item.item_type}
            />
          ))}
        </Slider>
      </Box>
    </>
  );
};
