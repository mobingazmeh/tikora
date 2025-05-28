"use client"
import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import useShoppingCartStore from "@/lib/store/useCartDetailsStore";
import { CartItem } from "@/services/cart/useGetCartDetails";

interface AddToBasketButtonProps {
  product: {
    id: number;
    type: 'simple' | 'variable';
    variety_id?: number;
    variety_value_id?: number;
  };
}

const AddToBasketButton = ({ product }: AddToBasketButtonProps) => {
  const addItemToCart = useShoppingCartStore((state) => state.addItemToCart);

  const handleAddToCart = async () => {
    const cartItem: CartItem = {
      product_id: product.id,
      quantity: 1,
      type: product.type,
      ...(product.variety_id && { variety_id: product.variety_id }),
      ...(product.variety_value_id && { variety_value_id: product.variety_value_id })
    };

    await addItemToCart(cartItem);
  };

  return (
    <div className="w-full"> {/* یک div wrapper برای دکمه که عرض کامل صفحه را دارد */}
      <button 
        onClick={handleAddToCart}
        className="w-full text-white text-base font-medium p-2 gap-x-2 rounded-lg bg-gradient-to-l from-secondary-500 to-secondary-300 flex items-center justify-center h-12"
      >
        {/* دکمه‌ای که ویژگی‌های مختلفی دارد */}
        <span>
          <Icon icon={"solar:cart-3-linear"} className="size-6" /> {/* آیکون سبد خرید از کتابخانه Iconify */}
        </span>
        <span>افزودن به سبد خرید</span> {/* متن دکمه */}
      </button>
    </div>
  );
};

export default AddToBasketButton;