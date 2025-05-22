"use client";

// وارد کردن وابستگی‌ها
import FILTER_CONSTANTS from "@/constants/FiltersConstants"; // ثابت‌هایی برای نام فیلترها
import useQueryManager from "@/lib/utils/useQueryManager"; // برای مدیریت وضعیت فیلترها
import { Icon } from "@iconify/react/dist/iconify.js"; // برای استفاده از آیکون‌ها
import React from "react";

// کامپوننت DesktopSelectedFilters برای نمایش فیلترهای انتخابی
const DesktopSelectedFilters = () => {
  // دریافت وضعیت فیلترها و توابعی برای حذف و ریست فیلترها
  const { state, resetStates, deleteState } = useQueryManager();

  // بررسی وجود فیلترهای انتخاب شده
  const isHaveFilter = Object.keys(state).length > 0;
  
  // استخراج نام فیلترهای انتخابی از وضعیت
  const selectedFilters = Object.keys(state) as Array<keyof typeof FILTER_CONSTANTS.filterNames>;

  return (
    <div className="w-full flex mb-2 gap-x-2">
      <div className="w-fit flex gap-x-2">
        {/* رندر کردن دکمه‌های فیلترهای انتخابی */}
        {selectedFilters.map((filter) => {
          // اگر فیلتر مربوط به قیمت باشد، آن را به شیوه خاصی رندر می‌کنیم
          if (filter.includes("price_start") || filter.includes("price_end")) {
            if (filter.includes("price_start")) {
              return (
                <button
                  key={filter}
                  onClick={() => {
                    // حذف فیلتر قیمت
                    deleteState(["price_start", "price_end"]);
                  }}
                  className=" text-xs rounded-full flex items-center justify-center px-3 py-2 border border-secondary-500 bg-secondary-500/5 text-secondary-500"
                >
                  <span className="ml-1 ">
                    <Icon
                      icon={"solar:close-circle-outline"}
                      className="size-4"
                    />
                  </span>
                  <div className="flex gap-x-1">
                    {/* نمایش محدوده قیمت */}
                    <span>قیمت از </span>
                    <span>
                      {Number(state["price_start"]).toLocaleString("fa-IR")}
                    </span>
                    <span>تا</span>
                    <span>
                      {Number(state["price_end"]).toLocaleString("fa-IR")}
                    </span>
                  </div>
                </button>
              );
            }
          }

          // اگر فیلتر مربوط به مرتب‌سازی باشد
          if (filter.includes("sort_by") || filter.includes("price_end")) {
            const filterKey = (state?.["sort_order"] +
              "," +
              state?.[filter]) as keyof typeof FILTER_CONSTANTS.filterNames;
            return (
              <button
                key={filter}
                onClick={() => {
                  // حذف فیلتر مرتب‌سازی
                  deleteState(["sort_order", "sort_by"]);
                }}
                className=" text-xs rounded-full flex items-center justify-center px-3 py-2 border border-secondary-500 bg-secondary-500/5 text-secondary-500"
              >
                <span className="ml-1 ">
                  <Icon
                    icon={"solar:close-circle-outline"}
                    className="size-4"
                  />
                </span>
                {/* تعداد آیتم‌های انتخاب شده در فیلتر */}
                {Array.isArray(state?.[filter]) && (
                  <span className="font-semibold px-1">
                    {state?.[filter].length}
                  </span>
                )}

                {/* نمایش نام فیلتر */}
                {FILTER_CONSTANTS?.filterNames?.[filterKey]}
              </button>
            );
          } else if (!filter.includes("sort"))
            return (
              <button
                key={filter}
                onClick={() => {
                  // حذف فیلتر خاص
                  deleteState([filter]);
                }}
                className=" text-xs rounded-full flex items-center justify-center px-3 py-2 border border-secondary-500 bg-secondary-500/5 text-secondary-500"
              >
                <span className="ml-1 ">
                  <Icon
                    icon={"solar:close-circle-outline"}
                    className="size-4"
                  />
                </span>
                {/* تعداد آیتم‌های انتخاب شده در فیلتر */}
                {Array.isArray(state?.[filter]) && (
                  <span className="font-semibold px-1">
                    {state?.[filter].length}
                  </span>
                )}
                {/* نمایش نام فیلتر */}
                {FILTER_CONSTANTS?.filterNames?.[filter]}
              </button>
            );
        })}
      </div>

      {/* اگر فیلترهایی وجود داشته باشد، دکمه برای ریست کردن فیلترها نمایش داده می‌شود */}
      {isHaveFilter && (
        <>
          <span className="block w-px h-8 border"></span>
          <button
            className="px-2 text-secondary-500"
            onClick={() => {
              // ریست کردن تمام فیلترها
              resetStates();
            }}
          >
            حذف فیلتر ها
          </button>
        </>
      )}
    </div>
  );
};

export default DesktopSelectedFilters;
