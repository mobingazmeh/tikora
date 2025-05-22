"use client";

import { Icon } from "@iconify/react/dist/iconify.js";

const EmptyCart = () => {
  return (
    <div className="text-center py-8">
      <Icon icon="solar:cart-3-linear" className="w-16 h-16 mx-auto text-gray-400" />
      <p className="mt-4 text-gray-600">سبد خرید شما خالی است</p>
    </div>
  );
};

export default EmptyCart; 