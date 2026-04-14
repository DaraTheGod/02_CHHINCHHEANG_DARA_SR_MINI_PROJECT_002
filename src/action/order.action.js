"use server";
import { orderService } from "../service/order.service";
import { revalidatePath } from "next/cache";

export async function createOrderAction(cartItems, token) {
  const payload = {
    orderDetailRequests: cartItems.map((item) => ({
      productId: item.productId,
      orderQty: item.quantity,
    })),
  };

  try {
    const result = await orderService().createOrder(payload, token);

    if (
      result.payload ||
      result.status?.includes("CONTINUE") ||
      result.status?.includes("OK")
    ) {
      return { success: true, data: result.payload };
    }

    return { success: false, error: result.message || "Order failed" };
  } catch (e) {
    return { success: false, error: "Network error" };
  }
}
