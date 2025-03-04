/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Button from "@/app/components/Button";
import ProductImage from "@/app/components/products/ProductImage";
import SetColor from "@/app/components/products/SetColor";
import SetQuantity from "@/app/components/products/SetQuantity";
import { useCart } from "@/hooks/useCart";
import { Rating } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { MdCheckCircle } from "react-icons/md";

interface ProductDetailsProps {
  product: any;
}

export type CartProductType = {
  id: string,
  name: string,
  description: string,
  brand: string,
  category: string,
  selectedImg: SelectedImgType,
  quantity: number,
  price: number
}

export type SelectedImgType = {
  color: string,
  colorCode: string,
  image: string,
}

const Horizontal = () => {
  return <hr className="w-[30%] my-2" />
}

const ProductDetails: React.FC<ProductDetailsProps>= ({ product }) => {
  const { handleAddProductToCart, cartProducts} = useCart()
  const [isProductInCart, setIsProductInCart] = useState(false);
  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    brand: product.brand,
    selectedImg: {...product.images[0]},
    quantity: 1,
    price: product.price
  });
  const router = useRouter();

  useEffect(() => {
    setIsProductInCart(false);

    if (cartProducts) {
      const existingIndex = cartProducts.findIndex(
        (item) => item.id === product.id
      );

      if (existingIndex > -1) {
        setIsProductInCart(true);
      }

    }
  }, [cartProducts])

  const productRating = product.reviews.reduce((acc: number, item: any) =>
      item.rating + acc, 0 / product.reviews?.length
    )     
    
    const handelColorSelect = useCallback(
      (value: SelectedImgType) => {
        setCartProduct((prev) => {
          return { ...prev, selectedImg: value}
        })
      }, [cartProduct.selectedImg]
    )

    const handleQtyDecrease = useCallback(() => {
      if (cartProduct.quantity <= 1) {
        return;
      }
    
      setCartProduct((prev) => {
        return {
          ...prev,
          quantity: prev.quantity - 1, // Decrement without directly mutating
        };
      });
    }, [cartProduct]);
    
    const handleQtyIncrease = useCallback(() => {
      if (cartProduct.quantity >= 99) {
        return;
      }
    
      setCartProduct((prev) => {
        return {
          ...prev,
          quantity: prev.quantity + 1, // Increment without directly mutating
        };
      });
    }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <ProductImage
        cartProduct={cartProduct} 
        product={product} 
        handleColorSelect={handelColorSelect}
      />
      <div className="">
        <h2 className="text-3xl font-medium text-slate-700">{product.name}</h2>
        <div className="">
            <Rating value={productRating} readOnly/>
            <div className="">{product.reviews.length} reviews</div>
        </div>
        <Horizontal/>
        <div className="text-justify">{product.description}</div>
        <Horizontal/>
        <div className="">
            <span className="font-semibold">Category: </span> 
            {product.category}
        </div>
        <Horizontal/>
        <div className="">
            <span className="font-semibold">Brand: </span> 
            {product.brand}
        </div>
        <Horizontal/>
        <div className={product.inStock ? "text-teal-400" : "text-rose-400"}>
            {product.inStock ? "In Stock" : "Out of Stock"}
        </div>
        <Horizontal/>
        {isProductInCart ? (
          <>
            <p className="mb-2 text-slate-500 flex items-center gap-1">
              <MdCheckCircle size={20}/>
              <span className="">Product added to cart</span>
            </p>
            <div className="max-w-[300px]">
              <Button 
                label="View Cart"
                outline
                onClick={() => {router.push("/cart")}}
              />
            </div>
          </>
        ) : (
          <>
            <SetColor
              cartProduct={cartProduct}
              images={product.images}
              handelColorSelect={handelColorSelect}
            />
            <Horizontal/>
            <SetQuantity
              cartProduct={cartProduct}
              handleQtyDecrease={handleQtyDecrease}
              handleQtyIncrease={handleQtyIncrease}
            />
            <Horizontal/>
            <div className="max-w-[300px]">
              <Button
                  label="Add To Cart"
                  onClick={() => {handleAddProductToCart(cartProduct)}}
              />
            </div>
          </>
        )}
        
      </div>
    </div>
  )
}

export default ProductDetails
