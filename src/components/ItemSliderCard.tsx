import React from 'react';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

type Props = {
  imgSrcs: string[];
};

export const ItemSliderContainer: React.FC<Props> = ({ imgSrcs }) => {
  return (
    <div
      style={{
        width: '100%'
      }}
    >
      <Slider
        dots
        slidesToShow={1}
        slidesToScroll={1}
        slidesPerRow={1}
        swipe
        arrows={false}
        infinite={false}
      >
        {imgSrcs.map((item, i) => (
          <img
            alt={item}
            src={`https://ibassets.com.br/ib.item.image.big/b-${item}`}
            width="100%"
            height="100%"
            key={i}
          />
        ))}
      </Slider>
    </div>
  );
};
