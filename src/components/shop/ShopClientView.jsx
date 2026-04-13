// app/shop/ShopClientView.jsx
"use client";

import { useState, useMemo } from "react";
import ShopCardComponent from "./ShopCardComponent";
import ShopFilterSidebar from "./ShopFilterSidebar";

export default function ShopClientView({ initialProducts, categories }) {
  const [filters, setFilters] = useState({
    search: "",
    priceRange: 300,
    selectedCategories: [],
  });

  const categoryCounts = useMemo(() => {
    return initialProducts.reduce((acc, product) => {
      acc[product.categoryId] = (acc[product.categoryId] || 0) + 1;
      return acc;
    }, {});
  }, [initialProducts]);

  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(filters.search.toLowerCase());
      const matchesPrice = product.price <= filters.priceRange;
      const matchesCategory =
        filters.selectedCategories.length === 0 ||
        filters.selectedCategories.includes(product.categoryId);

      return matchesSearch && matchesPrice && matchesCategory;
    });
  }, [filters, initialProducts]);

  return (
    <main className=" mx-auto w-full max-w-7xl items-center justify-between gap-4 lg:py-4 m-14">
      <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Luxury beauty products
          </h1>
          <p className="mt-2 text-gray-500">
            Use the filters to narrow by price and brand.
          </p>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Search by product name..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="w-85 rounded-xl border border-gray-200 px-4 py-3 font-medium outline-none ring-lime-400/20 focus:ring-2 focus:border-lime-400"
          />
        </div>
      </div>

      <div className="flex flex-col gap-10 md:flex-row">
        <div className="shrink-0">
          <ShopFilterSidebar
            categories={categories}
            filters={filters}
            setFilters={setFilters}
            categoryCounts={categoryCounts}
          />
        </div>

        <div className="flex-1">
          <p className="mb-6 text-gray-500">
            Showing{" "}
            <span className="font-bold text-gray-900">
              {filteredProducts.length}
            </span>{" "}
            products
          </p>

          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <ShopCardComponent
                key={product.productId}
                product={product}
                categoryName={
                  categories.find((c) => c.categoryId === product.categoryId)
                    ?.name || "Skincare"
                }
              />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="flex h-64 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50/50">
              <p className="text-gray-900 text-lg font-medium">
                No products match these filters.
              </p>
              <p className="mt-2 text-gray-500">
                Try raising the price limit or clearing category filters.
              </p>
              <button
                onClick={() =>
                  setFilters({
                    search: "",
                    priceRange: 300,
                    selectedCategories: [],
                  })
                }
                className="mt-4 text-sm font-semibold bg-gray-900 text-white px-5 py-3 rounded-full transition"
              >
                Reset all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
