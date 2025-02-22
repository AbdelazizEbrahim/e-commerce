import Container from "@/app/components/Container";
import ProductDetails from './ProductDetails'
import ListRating from "./ListRating";
import { products } from "@/app/utils/products";

interface IPrams {
  productId?: string; 
}

const Product = ({ params } : {params: IPrams}) => {
  const product = products.find((item) => item.id === params.productId)
  return (
    <div className="p-8">
      <Container>
        <ProductDetails product={product}/>
        <div className="flex flex-col mt-20 gap-4">
          <div className="">Add Rating</div>
          <ListRating product={product}/>
        </div>
      </Container>
    </div>
  )
}

export default Product;
