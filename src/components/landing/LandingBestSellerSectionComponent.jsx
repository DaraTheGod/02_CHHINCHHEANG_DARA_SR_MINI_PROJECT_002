"use client";

import React from "react";
import ProductCardComponent from "../ProductCardComponent";

export default function LandingBestSellerSectionComponent({ items, isAuth }) {
  const isAuthenticated = isAuth;
  const hasItems = items && items.length > 0;
  return (
    <section className="mx-auto w-full max-w-7xl py-16 lg:py-20">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
            Best selling products
          </h2>
          <p className="mt-2 text-gray-500">
            Tap + to add — state syncs with your cart in the header.
          </p>
        </div>
      </div>
      <div className="mt-12">
        {!isAuthenticated ? (
          <div className="flex flex-col items-center justify-center w-full gap-6 mt-4 px-4">
            <p className="text-sm text-gray-500 text-center px-6 mt-1 max-w-md">
              Sign in to unlock our current best-selling skincare favorites.
            </p>
          </div>
        ) : !hasItems ? (
          <div className="flex items-center justify-center w-full py-12">
            <p className="text-md text-gray-500 text-center">
              No best-selling products to show yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-6">
            {items.map((product, index) => (
              <ProductCardComponent product={product} key={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
