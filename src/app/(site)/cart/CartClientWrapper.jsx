"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import { useCartStore } from "../../../store/useCartStore";
import { useSession } from "next-auth/react";
import { createOrderAction } from "../../../action/order.action";
import { useRouter } from "next/navigation";

export default function CartClientWrapper() {
  const { cart, updateQuantity, removeFromCart, clearCart, getTotalPrice } =
    useCartStore();
  const { data: session } = useSession();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted)
    return <div className="animate-pulse h-96 bg-gray-50 rounded-3xl" />;

  const handleCheckout = async () => {
    if (!session?.user?.accessToken) return router.push("/login");

    const result = await createOrderAction(cart, session.user.accessToken);
    if (result.success) {
      clearCart();
      router.push("/orders");
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
    <div className="space-y-6">
      {cart.length === 0 ? (
        <>
          <div className="py-20 text-center border-2 border-dashed rounded-3xl border-gray-200">
            <p className="text-gray-400">Your cart is empty</p>
          </div>
        </>
      ) : (
        <>
          <p className="text-sm font-bold text-gray-900">
            {cart.length}
            <span className="text-sm font-normal text-gray-500">
              {" "}
              products in cart
            </span>
          </p>

          <section className="rounded-3xl border border-gray-100 bg-white shadow-sm overflow-hidden">
            {cart.map((item) => (
              <div
                key={`${item.productId}-${item.color}-${item.size}`}
                className="flex items-center justify-between p-6 border-b border-gray-50 last:border-0"
              >
                <div className="flex gap-6 items-center">
                  <div className="relative size-24 bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
                    {isValidUrl(item.imageUrl) ? (
                      <Image
                        src={item.imageUrl}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover transition group-hover:scale-[1.02]"
                      />
                    ) : (
                      <div className="flex size-full items-center justify-center bg-linear-to-br from-gray-100 to-lime-50/30 text-gray-400">
                        ◇
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">
                      {item.name}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {item.color} · {item.size}
                    </p>
                    <p className="mt-2 font-bold text-gray-900">
                      ${item.price?.toFixed(2)} each
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-3">
                  <div className="flex h-10 items-center rounded-full border border-gray-200 bg-gray-50 px-3">
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.productId,
                          item.color,
                          item.size,
                          -1,
                        )
                      }
                      className="px-2 text-gray-400"
                    >
                      −
                    </button>
                    <span className="w-8 text-center font-bold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.productId, item.color, item.size, 1)
                      }
                      className="px-2 text-gray-400"
                    >
                      +
                    </button>
                  </div>
                  <p className="font-bold text-lg">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() =>
                      removeFromCart(item.productId, item.color, item.size)
                    }
                    className="text-red-500 text-xs font-bold hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </section>

          <section className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <div>
                {" "}
                <h2 className="text-xl font-medium text-gray-700">Subtotal</h2>
                <p className="text-gray-500 mt-2">
                  Tax and shipping calculated at checkout.
                </p>
              </div>
              <span className="text-2xl font-bold text-gray-900">
                ${getTotalPrice().toFixed(2)}
              </span>
            </div>
            <Button
              onPress={handleCheckout}
              className="w-full h-12 bg-[#1e293b] text-white font-bold rounded-full"
            >
              Checkout
            </Button>
            <Button
              onPress={clearCart}
              className="w-full h-12 bg-gray-100 border border-gray-300 text-[#1e293b] font-bold rounded-full mt-3"
            >
              Clear Cart
            </Button>
          </section>
        </>
      )}
    </div>
  );
}
