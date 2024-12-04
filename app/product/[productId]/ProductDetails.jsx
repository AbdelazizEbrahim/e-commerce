'use client';

import { Rating } from "@mui/material";

const ProductDetails= ({ product }) => {
    const productRating = product.reviews.reduce((acc, item) =>
        item.rating + acc, 0 / product.reviews?.length
      )

      const Horizontal = () => {
        return <hr className="w-[30%] my-2" />;
      };      

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div className="">Images</div>
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
        <div className="">
           Color
        </div>
        <Horizontal/>
        <div className="">
           Quality
        </div>
        <Horizontal/>
        <div className="">
           Add to cart
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
