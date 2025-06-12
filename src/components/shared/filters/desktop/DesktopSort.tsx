"use client";
import { cn } from "@/lib/utils";
import useQueryManager from "@/lib/utils/useQueryManager";
import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

const DesktopSort = () => {
    // دسترسی به وضعیت مرتب‌سازی از useQueryManager
  const { state, setState } = useQueryManager();
 // تعریف آرایه‌ای از گزینه‌های مرتب‌سازی
 const items = [
  { id: 1, sort: "desc", title: "جدیدترین" },
  { id: 2, sort: "desc_price_products", title: "گرانترین" },
  { id: 3, sort: "acs_price_products", title: "ارزانترین" },
  { id: 4, sort: "desc_discount_products", title: "پر تخفیف ترین" },
  { id: 5, sort: "best_seller_products", title: "پر فروش ترین" },

];


 // رندر کامپوننت
 return (
  <div className="w-full flex items-center justify-start gap-x-2 px-0 mb-3">
    {/* عنوان مرتب‌سازی */}
    <div className="w-fit flex items-start gap-x-1">
      <span>
        {/* آیکون مرتب‌سازی */}
        <Icon icon={"bi:sort-down"} className="size-6" />
      </span>
      <span className="font-medium">مرتب سازی:</span>
    </div>

    {/* گزینه‌های مرتب‌سازی */}
    <div className="flex-1 flex justify-start items-center gap-x-3">
      {items.map((item) => {
        // بررسی وضعیت فعال بودن گزینه مرتب‌سازی
        const isActive =
          state.sort === item.sort 

        return (
          <button
            key={item.id}
            className={cn(
              "w-fit px-2 text-xs font-medium", // کلاس‌های استایل
              isActive && "text-green font-semibold" // تغییرات استایل در صورت فعال بودن
            )}
            onClick={() => {
              // تغییر وضعیت مرتب‌سازی
              setState({
                sort: item.sort,
              });
            }}
          >
            {item.title} {/* نمایش عنوان گزینه */}
          </button>
        );
      })}
    </div>
  </div>
);
};

export default DesktopSort;