import Container from "@/app/components/Container";
import ProductDetails from './ProductDetails'
import { product } from "@/app/utils/product";

const ProductPage = ({ params }) => {

  console.log("params on the server: ", params);

  return (
    <div className="p-8">
      <Container>
        <ProductDetails product={product}/>
      </Container>
    </div>
  )
}

export default ProductPage
