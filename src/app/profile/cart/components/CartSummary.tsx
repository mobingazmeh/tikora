"use client";

import { Button } from "@/components/ui/button";

interface CartSummaryProps {
  total_price: number;
  discount_amount: number;
  final_price: number;
  onCheckout: () => void;
}

const CartSummary = ({
  total_price,
  discount_amount,
  final_price,
  onCheckout,
}: CartSummaryProps) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 border border-green">
      <h2 className="text-lg font-bold mb-4">خلاصه سفارش</h2>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>جمع کل:</span>
          <span>{new Intl.NumberFormat("fa-IR").format(total_price)} تومان</span>
        </div>
        {discount_amount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>تخفیف:</span>
            <span>{new Intl.NumberFormat("fa-IR").format(discount_amount)} تومان</span>
          </div>
        )}
        <div className="flex justify-between font-bold pt-2 border-t">
          <span>مبلغ قابل پرداخت:</span>
          <span>{new Intl.NumberFormat("fa-IR").format(final_price)} تومان</span>
        </div>
      </div>
      <Button variant='green' className="w-full mt-4" onClick={onCheckout}>
        ادامه فرآیند خرید
      </Button>
    </div>
  );
};

export default CartSummary; 