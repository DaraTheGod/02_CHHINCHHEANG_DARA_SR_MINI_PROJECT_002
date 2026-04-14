"use client";

import { Button } from "@nextui-org/react";
import React from "react";
import { useCartStore } from "../store/useCartStore";
import { toastSuccessTopEnd } from "../lib/toast";

export default function ButtonAddComponent({ product }) {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!product) return;
    addToCart(product, 1, null, null);
  };

  return (
    <Button
      isIconOnly
      onClick={handleQuickAdd}
      onPress={() =>
        toastSuccessTopEnd(
          "Added to Cart",
          `${product.name} has been added to your cart.`,
        )
      }
      className="size-11 rounded-full bg-lime-400 text-xl font-light text-gray-900 shadow-sm transition hover:bg-lime-300 active:scale-95"
    >
      +
    </Button>
  );
}
