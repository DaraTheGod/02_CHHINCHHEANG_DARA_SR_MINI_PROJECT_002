// app/shop/page.js
import { categoryService } from "../../../service/category.service";
import { productService } from "../../../service/product.service";
import ShopClientView from "../../../components/shop/ShopClientView";
import { auth } from "../../../auth";

export default async function Page() {
  const session = await auth();
  const token = session?.user?.accessToken;

  const [categoriesData, productsData] = await Promise.all([
    categoryService().getCategories(token),
    productService().getAllProducts(token),
  ]);

  const categories = categoriesData?.payload || [];
  const products = productsData?.payload || [];

  return <ShopClientView initialProducts={products} categories={categories} />;
}
