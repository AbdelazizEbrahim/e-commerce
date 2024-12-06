'use client'
import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import { createContext, useCallback, useContext, useState } from "react";

type CartContextType = {
    cartTotalQty: number;
    cartProducts: CartProductType[] | null;
    handleAddProductToCart: (product: CartProductType) => void;
}

export const CartContext = createContext<CartContextType | null>(null);

interface Props {
    [propName: string] : never;
}

export const CartContextProvider = (props: Props) => {
    const [cartTotalQty, setCartTotalQty] = useState(0);
    const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(null);

    const handleAddProductToCart = useCallback((product: CartProductType) => {
        setCartProducts((prev) => {
            let updatedCart;

            if (prev) {
                updatedCart = [...prev, product]
            } else {
                updatedCart = [product]
            }
            return updatedCart;
        })
    }, []);

    const value = {
        cartTotalQty,
        cartProducts,
        handleAddProductToCart,
    }

    return <CartContext.Provider value={value} {...props}/>
};

export const useCart = () => {
    const context = useContext(CartContext);

    if (context === null) {
        throw new Error("use cart must be used in cart context provider.")
    }
  return context;
};




