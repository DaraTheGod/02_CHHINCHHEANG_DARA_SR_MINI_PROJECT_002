export function productService() {
  return {
    getBestSelling: async (token) => {
      try {
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
        const data = await res.json();
        return { ...data, payload: data?.payload || [] };
      } catch (error) {
        return { payload: [] };
      }
    },

    getAllProducts: async (token) => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/products`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
          },
        );
        const data = await res.json();
        return {
          ...data,
          payload: Array.isArray(data?.payload) ? data.payload : [],
        };
      } catch (error) {
        return { payload: [] };
      }
    },

    getProductById: async (productId, token) => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/products/${productId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
          },
        );
        const data = await res.json();
        return { ...data, payload: data?.payload || null };
      } catch (error) {
        return { payload: null };
      }
    },

    rateProduct: async (productId, star, token) => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/products/${productId}/rating?star=${star}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );
        return await res.json();
      } catch (error) {
        return { error: true, message: "Rating failed" };
      }
    },

    createProduct: async (productData, token) => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/products`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(productData),
          },
        );
        return await res.json();
      } catch (error) {
        return { error: true, message: "Creation failed" };
      }
    },

    updateProduct: async (productId, productData, token) => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/products/${productId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(productData),
          },
        );
        return await res.json();
      } catch (error) {
        return { error: true, message: "Update failed" };
      }
    },

    deleteProduct: async (productId, token) => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/products/${productId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        return res.ok;
      } catch (error) {
        return false;
      }
    },
  };
}
