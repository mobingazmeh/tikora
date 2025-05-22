import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import Link from "next/link";
import React from "react";

/**
 * کامپوننت آیتم لیست سفارش
 * این کامپوننت جزئیات یک سفارش را نمایش می‌دهد
 */
const OrderListItem = () => {
  return (
    // کانتینر اصلی آیتم سفارش
    <div className="w-full flex flex-col gap-y-6 rounded-lg bg-caption/5 border p-4">
      {/* بخش اطلاعات اصلی سفارش */}
      <div className="flex items-center justify-between">
        {/* شماره سفارش */}
        <div className="flex items-center gap-2">
          <span className="text-caption-dark">شماره سفارش</span>
          <span className="font-bold text-black">1234567890</span>
        </div>
        {/* تاریخ و زمان سفارش */}
        <div className="text-caption-dark">
          <span>16 اسفند 1402</span>
          <span>-</span>
          <span>15:14</span>
        </div>
      </div>

      {/* بخش مبالغ سفارش */}
      <div className="flex items-center justify-between">
        {/* مبلغ پرداخت شده */}
        <div className="flex items-center gap-x-2">
          <span className="text-caption-dark"> مبلغ پرداخت شده </span>
          <span className="font-bold text-black">1234567890</span>
          <span className="font-bold text-black">ریال</span>
        </div>
        {/* مبلغ تخفیف */}
        <div className="flex items-center gap-x-2">
          <span className="text-caption-dark"> تخفیف </span>
          <span className="font-bold text-black">1234567890</span>
          <span className="font-bold text-black">ریال</span>
        </div>
      </div>

      {/* بخش جزئیات سفارش */}
      <div className="rounded-lg bg-white px-3 py-2 flex flex-col gap-y-4 border">
        {/* بخش وضعیت و لینک جزئیات */}
        <div className="flex items-center justify-between">
          {/* نشانگر وضعیت سفارش */}
          <div></div>

          {/* لینک مشاهده جزئیات سفارش */}
          <div>
            <Link
              href={`/profile/orders/`}
              className="flex items-center gap-x-3 text-secondary-500"
            >
              <span>مشاهده مرسوله</span>
              <span>
                <Icon icon="solar:alt-arrow-left-linear" />
              </span>
            </Link>
          </div>
        </div>

        {/* لینک به فروشگاه */}
        <div>
          <Link
            href={`/markets/1/details`}
            className="flex items-center gap-x-4"
          >
            <span>
              <Icon icon={"clarity:store-line"} className="size-6" />
            </span>
            <span>
              <span>فروشگاه</span>
            </span>
          </Link>
        </div>

        {/* خط جداکننده */}
        <hr />

        {/* بخش محصول سفارش */}
        <div>
          <div className="flex items-center justify-between">
            {/* تصویر محصول */}
            <span className="size-9 rounded-full">
              <Image
                src={"/images/products/product-1.png"}
                alt="product"
                width={36}
                height={36}
              />
            </span>
            {/* قیمت محصول */}
            <span>
              <span>122555</span>
              <span>ریال </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderListItem;
