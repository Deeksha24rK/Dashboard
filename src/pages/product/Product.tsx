import Single from "../../components/single/Single";
import { singleProduct } from "../../data";

const Product = () => {
  // Fetch data and send it to single component
  return (
    <div className="product">
      <Single {...singleProduct} />
    </div>
  );
};

export default Product;
