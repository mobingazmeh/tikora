import { useQuery } from "@tanstack/react-query";
import { unstable_cache } from "next/cache";
import axiosClient from "../axiosClient";
import useShoppingCartStore from "@/lib/store/useCartDetailsStore";
import { QUERY_KEYS } from "@/constants/QueryKeys";
import { useMemo } from "react";
// انواع (Types)
export interface CartItem {
  product_id: number;
  quantity: number;
  type: 'simple' | 'variable';
  variety_id?: number;
  variety_value_id?: number;
}

export interface CartItemWithDetails extends CartItem {
  title: string;
  brief: string;
  cover: string;
  variety_title?: string;
  old_price: number;
  sale_price: number;
  payable_price: number;
  discount_amount: number;
  discount_code_amount: number;
  total_discount_amount: number;
  total_price: number;
  qty_basket: number;
  inventory: number;
  is_discount: boolean;
  type_discount: 'percent' | 'fixed';
  value_discount: number;
}

export interface CartFactor {
  total_price_items_real: number;
  total_price_items_payable: number;
  total_discount_amount: number;
  discount_amount: number;
  discount_code_amount: number;
  transport_amount: number;
  payable_price: number;
}

export interface CartDetails {
  items: CartItemWithDetails[];
  factor: CartFactor;
  total_price: number;
  discount_amount: number;
  final_price: number;
  coupon_code?: string;
  [key: string]: any; // اجازه اضافه شدن خواص دیگر
}

export interface CartRequestPayload {
  products: CartItem[];
  coupon_code?: string;
  delivery_method_id?: number;
}

export interface CartSummaryProps {
  factor: {
    total_price: number;
    discount_amount: number;
    final_price: number;
  };
}

export interface ShoppingCartState {
  cart: CartItem[];
  cartDetails: CartDetails | null;
  discountCode: string | null;
  severity: 'info' | 'success' | 'warning' | 'error';
  fetchCartDetails: () => Promise<void>;
  removeItemFromCart: (productId: number) => Promise<void>;
  setDiscountCode: (code: string | null) => void;
  addItemToCart: (product: CartItem) => Promise<void>;
  updateQuantity: (productId: number, quantity: number) => Promise<void>;
  clearCart: () => void;
  clearPersistedCart: () => void;
}

export interface CartItemsTableProps {
  items: CartItemWithDetails[];
  removeItemFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  loadingProductId: number | null;
}

export interface ManualCartTableProps {
  cart: CartItem[];
  loadingProductId: number | null;
  handleRemoveItem: (productId: number) => void;
}

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  success:boolean ;
}

// درخواست دریافت جزئیات سبد خرید
export async function getCartDetailsReq(payload: CartRequestPayload) {
  try {
    const response = await axiosClient({
      method: "post",
      url: `/orders/basket/details`,
      data: payload
    });
    console.log("✅ پاسخ کامل:", response);

   

    return response; // برگرداندن کل پاسخ
  } catch (error) {
    console.error(" خطا در دریافت جزئیات سبد خرید:", error);
    throw error;
  }
}
export const getCachedCartDetailsReq = unstable_cache(
  getCartDetailsReq,
  ["cart-details"],
  {
    revalidate: 60, // اعتبار کش ۶۰ ثانیه
  }
);

// کوئری برای دریافت جزئیات سبد خرید با React Query
export function useGetCartDetailsQuery() {
  const { cart, discountCode } = useShoppingCartStore();

  const payload = useMemo(() => ({
    products: cart,
    ...(discountCode ? { coupon_code: discountCode } : {}),
    delivery_method_id: 1
  }), [cart, discountCode]);

  console.log("🛒 داده نهایی payload قبل از ارسال:", payload);
  return useQuery({
    queryFn: async () => {
      const response = await getCartDetailsReq(payload);
      console.log("✅ پاسخ API:", response);
      return response?.result || null;
    },
    queryKey: [QUERY_KEYS.basketDetails, payload],
  });
}