"use client"
import { ShoppingCartState } from '@/services/cart/useGetCartDetails';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useShoppingCartStore = create<ShoppingCartState>()(
  persist(
    (set, get) => ({
      cart: [],
      cartDetails: null,
      discountCode: null,
      severity: 'info',
      clearPersistedCart: () => {
        try {
          localStorage.removeItem('shopping-cart-storage');
          set({ cart: [], discountCode: null, cartDetails: null });
          console.log("🧹 حافظه ذخیره شده سبد خرید پاک شد");
        } catch (error) {
          console.error("❌ خطا در پاک کردن حافظه سبد خرید:", error);
        }
      },
      addItemToCart: async (item) => {
        console.log("📦 درخواست افزودن محصول به سبد خرید:", item);

        set((state) => {
          const existingItem = state.cart.find(
            (i) =>
              i.product_id === item.product_id &&
              i.variety_id === item.variety_id &&
              i.variety_value_id === item.variety_value_id
          );

          if (existingItem) {
            console.log("📦 محصول در سبد موجود است. افزایش تعداد...", {
              productId: item.product_id,
              currentQuantity: existingItem.quantity,
              newQuantity: existingItem.quantity + item.quantity
            });
            return {
              cart: state.cart.map((i) =>
                i === existingItem
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          } else {
            console.log("📦 افزودن محصول جدید به سبد خرید:", {
              productId: item.product_id,
              quantity: item.quantity
            });
            return { cart: [...state.cart, item] };
          }
        });
      },
      removeItemFromCart: async (productId) => {
        console.log("🗑️ درخواست حذف محصول از سبد خرید:", { productId });

        set((state) => ({
          cart: state.cart.filter((item) => item.product_id !== productId),
        }));
      },
      updateQuantity: async (productId, quantity) => {
        set((state) => ({
          cart: state.cart.map((item) =>
            item.product_id === productId ? { ...item, quantity } : item
          ),
        }));
      },
      clearCart: () => {
        set({ 
          cart: [], 
          discountCode: null, 
          cartDetails: null 
        });
      },
      setDiscountCode: (code) => {
        set({ discountCode: code });
      },
      fetchCartDetails: async () => {
        console.log("🔄 وضعیت فعلی سبد خرید:", {
          totalItems: get().cart.length,
          items: get().cart,
          discountCode: get().discountCode
        });
        set({ cartDetails: null });
      },
    }),
    {
      name: 'shopping-cart-storage',
      partialize: (state) => ({ 
        cart: state.cart,
        discountCode: state.discountCode 
      }),
    }
  )
);

export default useShoppingCartStore;