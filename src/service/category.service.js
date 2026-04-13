export function categoryService() {
  return {
    getCategories: async (token) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/categories`,
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
    getCategoryById: async (token, categoryId) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/categories/${categoryId}`,
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
  };
}
