import { auth } from "../../../../auth";
import { productService } from "../../../../service/product.service";
import ProductDetailClient from "./ProductDetailClient";

export default async function ProductDetailPage({ params }) {
  const { productId } = await params;
  const session = await auth();
  const token = session?.user?.accessToken;

  const productInstance = productService();
  const response = await productInstance.getProductById(productId, token);

  const product = response?.payload;

  return <ProductDetailClient product={product} />;
}
