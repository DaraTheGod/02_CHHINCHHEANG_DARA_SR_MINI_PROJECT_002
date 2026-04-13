"use server";

import { productService } from "../service/product.service";
import { auth } from "../auth";
import { revalidatePath } from "next/cache";

export async function productAction(data, mode, productId = null) {
  try {
    const session = await auth();
    const token = session?.user?.accessToken;

    if (!token) {
      return { error: "You must be logged in to manage products." };
    }

    const service = productService();
    let result;

    if (mode === "edit" && productId) {
      result = await service.updateProduct(productId, data, token);
    } else {
      result = await service.createProduct(data, token);
    }

    if (!result || result.error) {
      return { error: result?.message || "Something went wrong." };
    }

    revalidatePath("/manage-products");

    return { success: true, payload: result.payload };
  } catch (error) {
    console.error("Product Action Error:", error);
    return { error: "Server connection failed." };
  }
}

export async function deleteProductAction(productId) {
  try {
    const session = await auth(); // ✅ was: getServerSession(authOptions) — wrong function
    const token = session?.user?.accessToken;

    if (!token) {
      return { error: "You must be logged in to delete products." };
    }

    const result = await productService().deleteProduct(productId, token);

    if (result) {
      revalidatePath("/manage-products");
      return { success: true };
    }

    return { error: "Failed to delete product." };
  } catch (error) {
    return { error: "Failed to delete product." };
  }
}
