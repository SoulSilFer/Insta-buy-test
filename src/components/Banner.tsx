import React from 'react';

import { Box } from '@mui/material';

import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

type Props = {
  imgSrc: string[];
};

export const Banner: React.FC<Props> = ({ imgSrc }) => {
  const handleDragStart = (e: any) => e.preventDefault();
  const carouselOptions = {
    autoPlayInterval: 2000,
    mouseTracking: true,
    disableDotsControls: true,
    disableButtonsControls: true,
    animationDuration: 2000,
    infinite: true,
    autoPlay: true
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      <AliceCarousel
        {...carouselOptions}
        items={imgSrc.map((item) => (
          <>
            <img
              src={`https://assets.instabuy.com.br/ib.store.banner/bnr-${item}`}
              alt={item}
              onDragStart={handleDragStart}
              width="100%"
              height="100%"
              style={{ borderRadius: '1rem' }}
              key={item}
            />
          </>
        ))}
      />
    </Box>
  );
};
