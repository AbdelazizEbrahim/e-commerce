/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

type CartContextType = {
    cartTotalQty: number;
    cartTotalAmount: number;
    cartProducts: CartProductType[] | null;
    handleAddProductToCart: (product: CartProductType) => void;
    handelRemoveProductFromCart: (product: CartProductType) => void;
    handleCartQtyIncrease: (product: CartProductType) => void;
    handleCartQtyDecrease: (product: CartProductType) => void;
    handleClearCart: () => void;
}

export const CartContext = createContext<CartContextType | null>(null);

interface Props {
    [propName: string] : any;
    children: React.ReactNode; // Explicitly define `children`
}

export const CartContextProvider = (props: Props) => {
    const [cartTotalQty, setCartTotalQty] = useState(0);
    const [cartTotalAmount, setCartTotalAmount] = useState(0);
    const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(null);

    useEffect(() => {
        const cartItems: any = localStorage.getItem('eShopCartProducts');
        const cProducts: CartProductType[] | null = JSON.parse(cartItems);

        setCartProducts(cProducts);
    }, [])

    console.log("values: ", cartTotalQty, cartTotalAmount)

    useEffect(() => {
        const getTotals = () => {
            if (cartProducts) {
                const { total, qty } = cartProducts?.reduce(
                    (acc, item) => {
                        const itemTotal = item.price * item.quantity;

                        acc.total += itemTotal;
                        acc.qty += item.quantity;
                        
                        return acc;
                    },
                    {
                        total: 0,
                        qty: 0,
                    }
                );
                setCartTotalQty(qty);
                setCartTotalAmount(total);
            }
        }
        getTotals();
    })

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
    
    const handelRemoveProductFromCart = useCallback((product: CartProductType) => {
        if (cartProducts) {
            const filterProducts = cartProducts.filter((item) => {
                return item.id !== product.id;
            })

            setCartProducts(filterProducts);
            toast.success("Product Removed");
            localStorage.setItem("eShopCartItems", JSON.stringify(filterProducts));
        }
    }, [cartProducts])

    const handleCartQtyIncrease = useCallback((product: CartProductType) => {
        let updatedCart;

        if (product.quantity >= 99) {
            return toast.error("Ooops! Maximum reached.")
        }
         if(cartProducts) {
            updatedCart = [...cartProducts]

            const existingIndex = cartProducts.findIndex(
                (item) => item.id === product.id
            );

            if (existingIndex > -1) {
                updatedCart[existingIndex].quantity = ++updatedCart[existingIndex].quantity;
            }

            setCartProducts(updatedCart)
            localStorage.setItem("eShopCartItems", JSON.stringify(updatedCart))
         }
    }, [cartProducts]);

    const handleCartQtyDecrease = useCallback((product: CartProductType) => {
        let updatedCart;

        if (product.quantity === 1) {
            return toast.error("Ooops! Minimum reached.")
        }
         if(cartProducts) {
            updatedCart = [...cartProducts]

            const existingIndex = cartProducts.findIndex(
                (item) => item.id === product.id
            );

            if (existingIndex > -1) {
                updatedCart[existingIndex].quantity = --updatedCart[existingIndex].quantity;
            }

            setCartProducts(updatedCart)
            localStorage.setItem("eShopCartItems", JSON.stringify(updatedCart))
         }
    }, [cartProducts]);

    const handleClearCart = useCallback(() => {
        setCartProducts(null)
        setCartTotalQty(0)
        localStorage.setItem("eShopCartItem", JSON.stringify(null));
    }, [cartProducts])

    const value = {
        cartTotalQty,
        cartTotalAmount,
        cartProducts,
        handleAddProductToCart,
        handelRemoveProductFromCart,
        handleCartQtyIncrease,
        handleCartQtyDecrease,
        handleClearCart
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




