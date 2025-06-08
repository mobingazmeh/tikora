"use client";

import useShoppingCartStore from "@/lib/store/useCartDetailsStore";
import CartListItem from "./components/CartListItem";
import CartSummary from "./components/CartSummary";
import EmptyCart from "./components/EmptyCart";
import { useRouter } from "next/navigation";
import { CartItemWithDetails, useGetCartDetailsQuery } from "@/services/cart/useGetCartDetails";
import { Icon } from "@iconify/react";
import DiscountCodeInput from "./components/DiscountCodeInput";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const CartPage = () => {
  const { data: cartData, isLoading } = useGetCartDetailsQuery();
  const { removeItemFromCart, updateQuantity, clearCart } = useShoppingCartStore();
  const router = useRouter();
  const [loadingProductId, setLoadingProductId] = useState<number | null>(null);
  const [loadingAction, setLoadingAction] = useState<'quantity' | 'remove' | null>(null);
  const [isClearing, setIsClearing] = useState(false);
 
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] ">
        <Icon icon="svg-spinners:6-dots-scale" className="text-green" width={80} />
      </div>
    );
  }

  const items: CartItemWithDetails[] = cartData?.items || [];
  const factor = cartData?.factor;

  const handleCheckout = () => {
    router.push("/checkout");
  };

  const handleUpdateQuantity = async (productId: number, newQuantity: number) => {
    setLoadingProductId(productId);
    setLoadingAction('quantity');
    try {
      await updateQuantity(productId, newQuantity);
    } finally {
      setLoadingProductId(null);
      setLoadingAction(null);
    }
  };

  const handleRemove = async (productId: number) => {
    setLoadingProductId(productId);
    setLoadingAction('remove');
    try {
      await removeItemFromCart(productId);
    } finally {
      setLoadingProductId(null);
      setLoadingAction(null);
    }
  };

  const handleClearCart = async () => {
    setIsClearing(true);
    try {
      await clearCart();
    } finally {
      setIsClearing(false);
    }
  };

 
  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-sm s mb-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-800">سبد خرید</h1>
          </div>
          
          {items.length > 0 && (
            <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="bg-white p-2 rounded-lg shadow-sm">
                  <Icon icon="solar:box-minimalistic-linear" className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">تعداد محصولات</span>
                  <span className="text-lg font-semibold text-gray-800">{items.length} محصول</span>
                </div>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                className="text-red-500 hover:text-red-600 hover:bg-red-50 border-red-200 h-8 px-3 text-xs font-medium"
                onClick={handleClearCart}
                disabled={isClearing}
              >
                {isClearing ? (
                  <Icon icon="svg-spinners:6-dots-scale" className="text-red-500 w-4 h-4" />
                ) : (
                  <div className="flex items-center gap-1.5">
                    <Icon icon="solar:trash-bin-trash-linear" className="w-3.5 h-3.5" />
                    <span>حذف همه محصولات</span>
                  </div>
                )}
              </Button>
            </div>
          )}
        </div>
      </div>

      {items.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {/* لیست محصولات */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="max-h-[500px] overflow-y-auto">
              <div className="space-y-4">
                {items.map((item: CartItemWithDetails) => (
                  <CartListItem
                    key={item.product_id}
                    id={item.product_id}
                    title={item.title}
                    cover={item.cover}
                    variety_title={item.variety_title}
                    price={item.old_price}
                    sale_price={item.payable_price}
                    qty_basket={item.qty_basket}
                    onUpdateQuantity={handleUpdateQuantity}
                    onRemove={handleRemove}
                    isLoading={loadingProductId === item.product_id}
                    loadingAction={loadingAction}
                  />
                ))}
              </div>
            </div>
          </div>
          {/* کد تخفیف */}
          <div className="bg-white rounded-lg shadow p-4 border border-green">
            <h2 className="text-lg font-semibold mb-4">کد تخفیف</h2>
            <DiscountCodeInput />
          </div>
          {/* خلاصه سفارش */}
          {factor && (
           <div className="pb-20 md:pb-0">
             <CartSummary
              total_price={factor.total_price_items_real}
              discount_amount={factor.total_discount_amount}
              final_price={factor.payable_price}
              onCheckout={handleCheckout}
            />
           </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CartPage;