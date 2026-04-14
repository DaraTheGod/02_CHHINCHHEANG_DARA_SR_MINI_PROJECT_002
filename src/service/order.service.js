export const orderService = () => ({
  createOrder: async (orderData, token) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    });
    return res.json();
  },
  getUserOrders: async (token) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/orders`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch orders: ${res.status}`);
      }

      return await res.json();
    } catch (error) {
      console.error("Order Service Error:", error);
      return { payload: [], message: error.message };
    }
  },
});
