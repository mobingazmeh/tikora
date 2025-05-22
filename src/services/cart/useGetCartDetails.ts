import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { unstable_cache } from "next/cache";

import { QUERY_KEYS } from "@/constants/QueryKeys";
import {
  SingleServiceResponseType
} from "@/lib/types/CommonTypes";
import axiosClient from "../axiosClient";
import useShoppingCartStore from "@/lib/store/useCartDetailsStore";


export interface CartItem {
    product_id: number;
    quantity: number;
    type: 'simple' | 'variable';
    variety_id?: number;
    variety_value_id?: number;
  }
  
  export interface CartItemWithDetails extends CartItem {
    title: string;
    price: number;
    sale_price: number;
    qty_basket: number;
    cover?: string;
    variety_title?: string;
  }
  
  export interface CartDetails {
    items: CartItem[];
    total_price: number;
    discount_amount: number;
    final_price: number;
    coupon_code?: string;
    [key: string]: any; // Allow for additional properties
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
  } 
 

export async function getCartDetailsReq(items: CartRequestPayload) {
  return (await axiosClient({
    method: "post",
    url: `/orders/basket/details`,
    data: items
  }));
  
}

// کش سمت سرور (Server-side caching)
export const getCachedCartDetailsReq = unstable_cache(
  getCartDetailsReq,
  ["cart-details"],
  {
    revalidate: 60, // مدت زمان اعتبار کش (ثانیه)
  }
);

export function useGetCartDetailsQuery() {
  const { cart, discountCode } = useShoppingCartStore();
  
  return useQuery({
    queryFn: () => getCartDetailsReq({
      products: cart,
      coupon_code: discountCode || undefined
    }),
    queryKey: [QUERY_KEYS.basketDetails, cart, discountCode],
  });
}