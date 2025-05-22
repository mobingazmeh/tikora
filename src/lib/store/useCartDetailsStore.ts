import { ShoppingCartState } from '@/services/orders/useGetOrders';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useShoppingCartStore = create<ShoppingCartState>()(
  persist(
    (set, get) => ({
      cart: [],
      cartDetails: null,
      discountCode: null,
      severity: 'info',
      addItemToCart: async (item) => {
        set((state) => {
          const existingItem = state.cart.find(
            (i) =>
              i.product_id === item.product_id &&
              i.variety_id === item.variety_id &&
              i.variety_value_id === item.variety_value_id
          );

          if (existingItem) {
            return {
              cart: state.cart.map((i) =>
                i === existingItem
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          } else {
            return { cart: [...state.cart, item] };
          }
        });
      },
      removeItemFromCart: async (productId) => {
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
        set({ cart: [], discountCode: null, cartDetails: null });
      },
      setDiscountCode: (code) => {
        set({ discountCode: code });
      },
      fetchCartDetails: async () => {
        // Implementation will be added later
        set({ cartDetails: null });
      },
    }),
    {
      name: 'shopping-cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useShoppingCartStore;

