"use client";

import useShoppingCartStore from "@/lib/store/useCartDetailsStore";
import CartListItem from "./components/CartListItem";
import CartSummary from "./components/CartSummary";
import EmptyCart from "./components/EmptyCart";
import { useRouter } from "next/navigation";
import { CartItemWithDetails, useGetCartDetailsQuery } from "@/services/cart/useGetCartDetails";

const CartPage = () => {
  const { cart, removeItemFromCart, updateQuantity } = useShoppingCartStore();
  const { data: cartDetails, isLoading } = useGetCartDetailsQuery();
  const router = useRouter();

  if (isLoading) {
    return <div>در حال بارگذاری...</div>;
  }

  const items = cartDetails?.result?.items || [];
  const factor = cartDetails?.result?.factor;
console.log(cartDetails?.result)
  const handleCheckout = () => {
    router.push("/checkout");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">سبد خرید</h1>

      {items.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {/* لیست محصولات */}
          <div className="bg-white rounded-lg shadow p-4 space-y-4">
            {items.map((item: CartItemWithDetails) => (
              <CartListItem
                key={item.product_id}
                id={item.product_id}
                title={item.title}
                cover={item.cover}
                variety_title={item.variety_title}
                price={item.old_price} // قیمت اصلی (قبل تخفیف)
                sale_price={item.payable_price} // قیمت نهایی پس از تخفیف
                qty_basket={item.qty_basket}
                onUpdateQuantity={updateQuantity}
                onRemove={removeItemFromCart}
              />
            ))}
          </div>

          {/* خلاصه سفارش */}
          {factor && (
            <CartSummary
              total_price={factor.total_price_items_real} // مجموع قیمت واقعی
              discount_amount={factor.total_discount_amount} // مجموع تخفیف
              final_price={factor.payable_price} // مبلغ قابل پرداخت نهایی
              onCheckout={handleCheckout}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default CartPage;
