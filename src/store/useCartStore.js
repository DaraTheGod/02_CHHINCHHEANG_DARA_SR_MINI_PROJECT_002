import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (product, quantity, color, size) => {
        const currentCart = get().cart;
        const existingItemIndex = currentCart.findIndex(
          (item) =>
            item.productId === product.productId &&
            item.color === color &&
            item.size === size,
        );

        if (existingItemIndex > -1) {
          const updatedCart = [...currentCart];
          updatedCart[existingItemIndex].quantity += quantity;
          set({ cart: updatedCart });
        } else {
          set({
            cart: [...currentCart, { ...product, quantity, color, size }],
          });
        }
      },

      removeFromCart: (productId, color, size) => {
        set({
          cart: get().cart.filter(
            (item) =>
              !(
                item.productId === productId &&
                item.color === color &&
                item.size === size
              ),
          ),
        });
      },

      updateQuantity: (productId, color, size, delta) => {
        const updatedCart = get().cart.map((item) => {
          if (
            item.productId === productId &&
            item.color === color &&
            item.size === size
          ) {
            return { ...item, quantity: Math.max(1, item.quantity + delta) };
          }
          return item;
        });
        set({ cart: updatedCart });
      },

      clearCart: () => set({ cart: [] }),

      getTotalQuantity: () =>
        get().cart.reduce((sum, item) => sum + item.quantity, 0),
      getTotalPrice: () =>
        get().cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    }),
    {
      name: "purely-store-cart",
    },
  ),
);
