"use client";

import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import React from "react";

interface SetQuatityProps {
    cartCounter?: boolean;
    cartProduct?: CartProductType;
    handleQtyIncrease: () => void;
    handleQtyDecrease: () => void;
}

const btnStyle = "border-[1.2px] border-slate-300 px-2 rounded";

const SetQuantity: React.FC<SetQuatityProps> = ({
    cartCounter,
    cartProduct,
    handleQtyIncrease,
    handleQtyDecrease
}) => {
  return (
    <div className="flex gap-8 items-center">
      {cartCounter ? null : <div className="font-semibold">Quantity: </div>}
      <div className="flex gap-4 items-center text-base">
        <button className={btnStyle} onClick={handleQtyDecrease}>-</button>
        <div className="">{cartProduct?.quantity}</div>
        <button className={btnStyle} onClick={handleQtyIncrease}>+</button>
      </div>
    </div>
  )
}

export default SetQuantity
