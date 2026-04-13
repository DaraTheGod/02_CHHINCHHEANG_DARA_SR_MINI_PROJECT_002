"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { productService } from "../../../../service/product.service";

const COLOR_THEME = {
  green: {
    selected: "bg-green-100 text-green-700 border-green-500",
    dot: "bg-green-500",
  },
  gray: {
    selected: "bg-gray-100 text-gray-700 border-gray-500",
    dot: "bg-gray-500",
  },
  red: {
    selected: "bg-red-100 text-red-700 border-red-500",
    dot: "bg-red-500",
  },
  blue: {
    selected: "bg-blue-100 text-blue-700 border-blue-500",
    dot: "bg-blue-500",
  },
  white: {
    selected: "bg-slate-50 text-slate-700 border-slate-300",
    dot: "bg-slate-300",
  },
};

const DEFAULT_THEME = {
  selected: "bg-slate-100 text-slate-700 border-slate-400",
  dot: "bg-slate-400",
};

function getTheme(color) {
  return COLOR_THEME[color?.toLowerCase()] ?? DEFAULT_THEME;
}

function StarRating({ star, productId, token, onRated }) {
  const [hovered, setHovered] = useState(null);
  const [loading, setLoading] = useState(false);
  const display = hovered ?? star ?? 0;

  const handleRate = async (rating) => {
    if (loading) return;
    setLoading(true);
    try {
      const svc = productService();
      const data = await svc.rateProduct(productId, rating, token);
      if (data?.payload) onRated?.(data.payload.star);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          onClick={() => handleRate(i)}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
          disabled={loading}
          className="transition-transform hover:scale-110 disabled:cursor-not-allowed"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill={i <= display ? "#f59e0b" : "none"}
            stroke={i <= display ? "#f59e0b" : "#d1d5db"}
            strokeWidth="1.5"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </button>
      ))}
    </div>
  );
}

export default function ProductDetailClient({ product }) {
  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  const [selectedColor, setSelectedColor] = useState(
    product?.colors?.[0] || "",
  );
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || "");
  const [quantity, setQuantity] = useState(1);
  const [star, setStar] = useState(product?.star ?? 0);

  const theme = getTheme(selectedColor);

  const isValidUrl = (url) => {
    try {
      return url && (url.startsWith("http://") || url.startsWith("https://"));
    } catch {
      return false;
    }
  };

  if (!product) return null;

  return (
    <main className="mx-auto max-w-7xl py-10 mb-8 px-4">
      <nav className="mb-8 flex items-center gap-2 text-sm text-gray-400">
        <Link href="/" className="hover:text-gray-600">
          Home
        </Link>
        <span>/</span>
        <Link href="/products" className="hover:text-gray-600">
          Products
        </Link>
        <span>/</span>
        <span className="font-medium text-gray-900">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm flex items-center justify-center">
          {isValidUrl(product.imageUrl) ? (
            <Image
              src={product.imageUrl}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain p-8"
              priority
            />
          ) : (
            <div className="flex size-full items-center justify-center bg-gray-50 text-gray-300 text-6xl">
              ◇
            </div>
          )}
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              {product.name}
            </h1>
            <div className="pt-1 shrink-0">
              <StarRating
                star={star}
                productId={product.productId}
                token={token}
                onRated={(newStar) => setStar(newStar)}
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-blue-900">
              ${product.price?.toFixed(2)}
            </span>
            <span className="text-xl text-gray-300 line-through">
              ${(product.price * 1.15).toFixed(2)}
            </span>
          </div>

          {product.colors?.length > 0 && (
            <div className="space-y-3">
              <p className="text-sm font-bold text-gray-900">Choose a color</p>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => {
                  const isActive = selectedColor === color;
                  const colorTheme = getTheme(color);
                  return (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`rounded-full px-5 py-2 text-sm font-medium capitalize border-2 transition-all ${
                        isActive
                          ? colorTheme.selected
                          : "bg-white text-gray-400 border-gray-100 hover:border-gray-200"
                      }`}
                    >
                      {color}
                    </button>
                  );
                })}
              </div>
              <p className="text-xs text-gray-400">
                Selected:{" "}
                <span className="text-green-600 font-medium">
                  {selectedColor}
                </span>
              </p>
            </div>
          )}

          {product.sizes?.length > 0 && (
            <div className="space-y-3">
              <p className="text-sm font-bold text-gray-900">Choose a size</p>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`flex h-10 w-14 items-center justify-center rounded-full border-2 text-xs font-bold uppercase transition ${
                      selectedSize === size
                        ? "border-gray-800 bg-white text-gray-800 shadow-sm"
                        : "border-gray-100 bg-gray-50 text-gray-400"
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      {selectedSize === size && (
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${theme.dot}`}
                        />
                      )}
                      {size}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <p className="max-w-2xl text-sm leading-relaxed text-gray-500">
            {product.description}
          </p>

          <div className="flex items-center gap-4">
            <div className="flex h-12 items-center rounded-full border border-gray-200 bg-gray-50 px-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-2 text-xl text-gray-400 hover:text-gray-600"
              >
                −
              </button>
              <span className="w-10 text-center font-bold text-gray-900">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-2 text-xl text-gray-400 hover:text-gray-600"
              >
                +
              </button>
            </div>
            <button className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-[#1e293b] font-semibold text-white shadow-lg transition hover:bg-slate-700">
              <span className="text-lg">🛍️</span> Add to cart
            </button>
          </div>

          <div className="mt-2 flex items-start gap-4 rounded-2xl border border-gray-100 p-5 bg-white">
            <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-900"
              >
                <path d="M9 10L4 15L9 20" />
                <path d="M20 4v7a4 4 0 0 1-4 4H4" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">
                Free 30-day returns
              </p>
              <p className="text-xs text-gray-400">
                See return policy details in cart.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
