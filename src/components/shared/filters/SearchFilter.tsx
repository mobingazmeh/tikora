"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useQueryManager from "@/lib/utils/useQueryManager";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SearchFilter = () => {
  // دریافت وضعیت و توابع برای تنظیم یا حذف وضعیت از hook useQueryManager
  const { state, setState, deleteState } = useQueryManager();
  
  // وضعیت جستجو، اگر داده‌ای در state موجود نباشد، مقدار اولیه خالی خواهد بود
  const [search, setSearch] = useState(state?.search || "");
  
  // بررسی اینکه آیا فیلتر جستجو قابل پاک کردن است
  const isCanBeClear = search && search == state?.search;
  
  // وضعیت لودینگ برای نمایش هنگام ارسال یا حذف جستجو
  const [isLoading, setIsLoading] = useState(false);

  // پارامترهای جستجو از URL
  const queris = useSearchParams();

  // زمانی که پارامترهای جستجو تغییر کنند، لودینگ غیرفعال می‌شود
  useEffect(() => {
    setIsLoading(false);
  }, [queris]);

  // ارسال درخواست جستجو یا حذف آن
  const handleSubmit = () => {
    setIsLoading(true);
    
    // اگر جستجو قابل پاک کردن باشد، حذف وضعیت جستجو
    if (isCanBeClear) {
      deleteState(["search"]);
      setSearch(""); // پاک کردن مقدار جستجو
    } else {
      setState({
        search: search, // ذخیره مقدار جستجو در state
      });
    }
  };

  // تابع برای حذف جستجو
  const handleDeleteSearch = () => {
    setIsLoading(true);
    deleteState(["search"]); // حذف وضعیت جستجو
    setSearch(""); // پاک کردن مقدار جستجو
  };

  return (
    <div className="flex items-center w-full h-12 gap-x-2">
      {/* فیلد ورودی برای جستجو */}
      <Input
        onKeyUp={(e) => e.keyCode == 13 && handleSubmit()} // ارسال جستجو با فشردن Enter
        type="search"
        value={search}
        onChange={(e) => {
          // اگر ورودی خالی شود، جستجو حذف می‌شود
          if (e.target.value.length == 0) {
            handleDeleteSearch();
          } else {
            setSearch(e.currentTarget.value); // بروزرسانی مقدار جستجو
          }
        }}
        icon={
          <Icon
            icon={"solar:magnifer-linear"}
            type="search"
            className="size-6 text-caption"
          />
        }
        placeholder={"جستجو "}
        containerClassName="!w-full"
        className="h-12 flex-1"
      />
      {/* دکمه برای ارسال یا پاک کردن جستجو */}
      <Button
        isLoading={isLoading} // نمایش لودینگ در هنگام ارسال یا پاک کردن جستجو
        onClick={handleSubmit} // ارسال درخواست جستجو یا پاک کردن آن
        variant={"secondary"}
        size={"icon"}
        icon={
          <Icon
            icon={
              isCanBeClear
                ? "solar:close-circle-line-duotone" // اگر جستجو قابل پاک کردن باشد
                : "solar:magnifer-linear" // اگر جستجو موجود باشد
            }
            type="search"
            className="!size-5 !w-12 h-11 text-white"
          />
        }
      ></Button>
    </div>
  );
};

export default SearchFilter;
