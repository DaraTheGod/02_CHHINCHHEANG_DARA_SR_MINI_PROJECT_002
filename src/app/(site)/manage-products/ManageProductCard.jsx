"use client";

import React, { useState } from "react";
import Image from "next/image";
import { deleteProductAction } from "../../../action/product.action";
import { StarRow } from "../../../components/ProductCardComponent";

export default function ManageProductCard({ product, onEdit }) {
  const [showMenu, setShowMenu] = useState(false);

  if (!product) return null;

  const handleDelete = async () => {
    if (confirm(`Are you sure you want to delete "${product?.name}"?`)) {
      await deleteProductAction(product.productId);
    }
  };

  const isValidUrl = (url) => {
    try {
      return url && (url.startsWith("http://") || url.startsWith("https://"));
    } catch {
      return false;
    }
  };

  return (
    <div className="group relative flex flex-col rounded-3xl border border-gray-100 p-4 transition-all hover:shadow-sm">
      <div className="absolute right-6 top-6 z-50">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowMenu(!showMenu);
          }}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-100 bg-white text-gray-400 shadow-sm transition hover:text-gray-900"
        >
          <span className="mb-2 text-xl font-bold">...</span>
        </button>

        {showMenu && (
          <>
            {/* Transparent backdrop to catch clicks and close menu safely */}
            <div
              className="fixed inset-0 z-10"
              onClick={() => setShowMenu(false)}
            />
            <div className="absolute right-0 z-20 mt-2 w-32 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMenu(false);
                  onEdit();
                }}
                className="w-full px-4 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Edit
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMenu(false);
                  handleDelete();
                }}
                className="w-full px-4 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50"
              >
                Delete
              </button>
            </div>
          </>
        )}
      </div>

      <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-2xl bg-gray-50">
        {isValidUrl(product?.imageUrl) ? (
          <Image
            src={product.imageUrl}
            alt={product?.name || ""}
            fill
            className="object-contain p-8"
          />
        ) : (
          <div className="text-6xl text-gray-300">◇</div>
        )}
      </div>

      <div className="mt-4 flex flex-col gap-1 px-1">
        <StarRow rating={product?.star || 0} />
        <h3 className="truncate font-bold text-gray-900">
          {product?.name || "No Name"}
        </h3>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">
            ${product?.price?.toFixed(2) || "0.00"}
          </span>
        </div>
      </div>
    </div>
  );
}
