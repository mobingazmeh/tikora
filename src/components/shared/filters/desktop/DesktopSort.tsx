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
  {
    id: 1,
    sort_order: "ASC", // مرتب‌سازی صعودی
    sort_by: "created_at", // مرتب‌سازی بر اساس تاریخ ایجاد
    title: "جدیدترین", // عنوان گزینه مرتب‌سازی
  },
    {
      id: 2,
      sort_order: "DESC",
      sort_by: "sale_price",
      title: "گرانترین",
    },
    {
      id: 3,
      sort_order: "ASC",
      sort_by: "sale_price",
      title: "ارزانترین",
    },
    {
      id: 4,
      sort_order: "DESC",
      sort_by: "off_percent",
      title: "پر تخفیف ترین",
    },
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
          state.sort_order === item.sort_order &&
          state.sort_by === item.sort_by;

        return (
          <button
            key={item.id}
            className={cn(
              "w-fit px-2 text-xs font-medium", // کلاس‌های استایل
              isActive && "text-secondary-500 font-semibold" // تغییرات استایل در صورت فعال بودن
            )}
            onClick={() => {
              // تغییر وضعیت مرتب‌سازی
              setState({
                sort_order: item.sort_order,
                sort_by: item.sort_by,
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