'use client'

import { useCart } from "@/hooks/useCart"
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import Heading from "../components/Heading";
import Button from "../components/Button";
import ItemContent from "./ItemContent";
import { FormatPrice } from "../utils/formatPrice";

const CartClient = () => {
  const { cartProducts, handleClearCart, cartTotalAmount } = useCart();

  if (!cartProducts || cartProducts.length === 0) {
    return (
      <div className="flex flex-col items-center">
        <div className="text-2xl">Your Cart is empty</div>
        <div className="">
          <Link href={'/'} className="text-slate-500 flex items-center gap-1 mt-2">
            <MdArrowBack/>
            <span>Start Shopping</span>
          </Link>
        </div>
      </div>
    )
  }
  return (
    <div>
      <Heading title="Shopping Cart" center/>
      <div className="grid grid-cols-5 text-xs gap-4 pb-2 items-center mt-8">
        <div className="col-span-2 justify-self-start ">Product</div>
        <div className="justify-self-start ">Price</div>
        <div className="justify-self-start ">Quantity</div>
        <div className="justify-self-start ">Total</div>
      </div>
      <div className="">
        {cartProducts && cartProducts.map((item) => {
          return <ItemContent key={item.id} item={item}/>
        })}
      </div>
      <div className="border-t-[1.5px] border-slate-200 py-4 flex justify-between gap-4">
        <div className="w-[90px]">
        <Button 
          label="Clear Cart" 
          onClick={() => {
            const confirmClear = window.confirm("Are you sure you want to clear your cart?");
            if (confirmClear) {
              handleClearCart();
            }
          }} 
          small 
          outline
        />
        </div>
        <div className="text-sm flex flex-col gap-1 items-start">
          <div className="flex justify-between w-full text-base font-semibold">
            <span className="">Subtotal</span>
            <span className="">{FormatPrice(cartTotalAmount)}0</span>
          </div>
          <p className="text-slate-500">
            Tax and shipping calculated at checkout
          </p>
          <Button label="Checkout" onClick={() => {}}/>
          <Link href={'/'} className="text-slate-500 flex items-center gap-1 mt-2">
            <MdArrowBack/>
            <span>Continue Shopping</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CartClient
