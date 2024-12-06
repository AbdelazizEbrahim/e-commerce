import { createContext, useContext, useState } from "react";

type CartContextType = {
  cartTotalQty: number;
  setCartTotalQty: React.Dispatch<React.SetStateAction<number>>;
};

export const CartContext = createContext<CartContextType | null>(null);

interface Props {
  children: React.ReactNode; // Add this to accept children
}

export const CartContextProvider: React.FC<Props> = ({ children }) => {
  const [cartTotalQty, setCartTotalQty] = useState(0);

  const value = {
    cartTotalQty,
    setCartTotalQty, // Include this if you need to update the quantity from child components
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (context === null) {
    throw new Error("useCart must be used within a CartContextProvider.");
  }
  return context;
};
