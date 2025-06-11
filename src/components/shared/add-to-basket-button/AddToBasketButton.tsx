"use client"
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useMemo } from "react";
import useShoppingCartStore from "@/lib/store/useCartDetailsStore";
import { CartItem } from "@/services/cart/useGetCartDetails";
import { toast } from "react-toastify";

interface AddToBasketButtonProps {
  product: {
    id: number;
    type: 'simple' | 'variable';
    variety_id?: number;
    variety_value_id?: number;
  };
}

const AddToBasketButton = ({ product }: AddToBasketButtonProps) => {
  const cart = useShoppingCartStore((state) => state.cart);
  const addItemToCart = useShoppingCartStore((state) => state.addItemToCart);
  const removeItemFromCart = useShoppingCartStore((state) => state.removeItemFromCart);

  // بررسی وجود محصول در سبد خرید با useMemo
  const isInCart = useMemo(() => {
    return cart.some(
      (item) =>
        item.product_id === product.id &&
        item.variety_id === product.variety_id &&
        item.variety_value_id === product.variety_value_id
    );
  }, [cart, product.id, product.variety_id, product.variety_value_id]);

  const handleCartAction = async () => {
    try {
      if (isInCart) {
        await removeItemFromCart(product.id);
        toast.success("محصول از سبد خرید حذف شد", {
          position: "top-right",
          rtl: true,
          theme: "dark"
        });
      } else {
        const cartItem: CartItem = {
          product_id: product.id,
          quantity: 1,
          type: product.type,
          ...(product.variety_id && { variety_id: product.variety_id }),
          ...(product.variety_value_id && { variety_value_id: product.variety_value_id })
        };

        await addItemToCart(cartItem);
        toast.success("محصول به سبد خرید اضافه شد", {
          position: "top-right",
          rtl: true,
          theme: "dark"
        });
      }
    } catch  {
      toast.error("خطا در عملیات سبد خرید", {
        position: "top-right",
        rtl: true,
        theme: "dark"
      });
    }
  };

  return (
    <div className="w-full">
      <button 
        onClick={handleCartAction}
        className={`w-full text-base font-medium p-2 gap-x-2 rounded-lg flex items-center justify-center transition-all duration-300 h-12 ${
          isInCart 
            ? "bg-red-100 text-red-500 border border-red-500 hover:bg-red-500 hover:text-white"
            : "bg-green text-white border border-green hover:text-green hover:bg-white"
        }`}
      >
        <span>
          <Icon 
            icon={isInCart ? "solar:trash-bin-trash-bold" : "solar:cart-3-linear"} 
            className="size-6" 
          />
        </span>
        <span>{isInCart ? "حذف از سبد خرید" : "افزودن به سبد خرید"}</span>
      </button>
    </div>
  );
};

export default AddToBasketButton;