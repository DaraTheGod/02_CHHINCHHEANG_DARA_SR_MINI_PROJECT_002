export async function productService() {
  return {
    getBestSelling: async (token) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/products/top-selling?limit=10`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        },
      );
      if (!res.ok) {
        return { payload: [] };
      }
      const data = await res.json();
      return data;
    },
    getAllProducts: async (token) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/products`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      });
      if (!res.ok) {
        return { payload: [] };
      }
      const data = await res.json();
      return data;
    },
  };
}
