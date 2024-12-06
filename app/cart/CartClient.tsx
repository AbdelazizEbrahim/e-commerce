'use client'

import { useCart } from "@/hooks/useCart"
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";

const CartClient = () => {
  const { cartProducts } = useCart();

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
      
    </div>
  )
}

export default CartClient
