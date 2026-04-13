import React from "react";
import { productService } from "../../../service/product.service";
import { auth } from "../../../auth";
import ManageProductClient from "./ManageProductClient";

export default async function ManageProductsPage() {
  const session = await auth();
  const token = session?.user?.accessToken;

  const response = await productService().getAllProducts(token);
  const products = response?.payload || [];

  return <ManageProductClient initialProducts={products} token={token} />;
}
