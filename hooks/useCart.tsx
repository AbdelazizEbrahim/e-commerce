/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

type CartContextType = {
    cartTotalQty: number;
    cartProducts: CartProductType[] | null;
    handleAddProductToCart: (product: CartProductType) => void;
}

export const CartContext = createContext<CartContextType | null>(null);

interface Props {
    [propName: string] : any;
    children: React.ReactNode; // Explicitly define `children`
}

export const CartContextProvider = (props: Props) => {
    const [cartTotalQty] = useState(0);
    const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(null);

    useEffect(() => {
        const cartItems: any = localStorage.getItem('eShopCartProducts');
        const cProducts: CartProductType[] | null = JSON.parse(cartItems);

        setCartProducts(cProducts);
    }, [])

    const handleAddProductToCart = useCallback((product: CartProductType) => {
        setCartProducts((prev) => {
            let updatedCart;
    
            if (prev) {
                updatedCart = [...prev, product];
            } else {
                updatedCart = [product];
            }
    
            localStorage.setItem("eShopCartProducts", JSON.stringify(updatedCart));
            return updatedCart;
        });
    
        // Show the toast after updating the cart
        toast.success("Product added to cart!");
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




