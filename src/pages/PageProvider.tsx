import React, { createContext, useState } from 'react';

export type CartType = {
  total: number;
  id: string;
  imgUrl: string;
  commentary: string;
  name: string;
  price: string;
};

export type CartContainer = {
  items: CartType[];
};

interface ContextProps {
  cart: CartContainer;
  updateCart: (cart: CartContainer) => void;
}

export const PagesContext = createContext({} as ContextProps);

type Props = {
  children: React.ReactNode;
};

const PagesProvider = ({ children }: Props) => {
  const [cart, setCart] = useState<CartContainer>({
    items: []
  });

  const updateCart = (newCart: CartContainer) => {
    setCart(newCart);
  };

  return (
    <PagesContext.Provider value={{ cart, updateCart }}>
      {children}
    </PagesContext.Provider>
  );
};

export default PagesProvider;
