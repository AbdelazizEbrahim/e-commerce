'use client';

import React from "react";
import { CartProductType } from "../product/[productId]/ProductDetails";
import Link from "next/link";
import { truncateText } from "../utils/truncate";
import { FormatPrice } from "../utils/formatPrice";
import Image from "next/image";
import SetQuantity from "../components/products/SetQuantity";
import { useCart } from "@/hooks/useCart";


interface ItemContentProps {
    item: CartProductType;
}
const ItemContent: React.FC<ItemContentProps> = ({ item }) => {
  const {handelRemoveProductFromCart} = useCart();
  return (
    <div className="grid grid-cols-5 text-xs md:text-sm gap-4 border-t-[1.5px] border-slate-200 py-4 items-center"
    >
      <div className="col-span-2 justify-self-start flex gap-2 md:gap-4">
        <Link href={`/product/${item.id}`}>
            <div className="relative w-[70px] aspect-square">
                <Image src={item.selectedImg.image} alt="" fill className="object-contain"/>
            </div>
        </Link>
        <div className="flex flex-col justify-between">
            <Link href={`/product/${item.id}`}>
                {truncateText(item.name)}
            </Link>
            <div className="">{item.selectedImg.color}</div>
            <div className="w-[70px]">
                <button className="text-slate-500 underline" onClick={() => handelRemoveProductFromCart(item)}>
                    Remove
                </button>
            </div>
        </div>
      </div>
      <div className="">{FormatPrice(item.price)}</div>
      <div className="">
        <SetQuantity 
            cartCounter = {true}
            cartProduct={item}
            handleQtyIncrease={() => {}}
            handleQtyDecrease={() => {}}
        />
      </div>
      <div className="font-semibold">
        {FormatPrice(item.price * item.quantity)}
      </div>
    </div>
  )
}

export default ItemContent
