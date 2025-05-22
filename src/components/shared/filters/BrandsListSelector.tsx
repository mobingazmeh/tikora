"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { BrandItemType, useGetBrandsListQuery } from "@/services/brands/useGetBrandsListQuery";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";

import useQueryManager from "@/lib/utils/useQueryManager";

// کامپوننت اصلی برای انتخاب برندها
const BrandsListSelector = () => {
  const [searchQuery, setSearchQuery] = useState(""); // وضعیت جستجو
  const { data, isLoading } = useGetBrandsListQuery({}); // دریافت داده‌ها از API
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]); // برندهای انتخابی

  const brands = data?.result || []; // برندها از داده‌های API
  console.log(brands)
  const { state, setState, deleteState } = useQueryManager(); // مدیریت وضعیت کوئری

  // انتخاب یا حذف برند از لیست انتخاب‌شده
  const handleSelectBrand = (status: boolean, id: string | number) => {
    if (status) {
      setSelectedBrands((prev) => [...prev, String(id)]); // افزودن برند به لیست انتخاب‌شده
      setState({ brands: [...selectedBrands, id] }); // به‌روزرسانی وضعیت کوئری
    } else {
      const removedTargetList = selectedBrands.filter((x) => x !== String(id)); // حذف برند از لیست
      setSelectedBrands(removedTargetList);
      if (removedTargetList.length == 0) {
        deleteState(["brands"]); // اگر هیچ برندی انتخاب نشده بود، وضعیت کوئری را حذف کن
      } else {
        setState({ brands: removedTargetList }); // به‌روزرسانی وضعیت کوئری
      }
    }
  };

  // بارگذاری برندهای ذخیره‌شده از کوئری
  useEffect(() => {
    if (selectedBrands.length == 0 && state.brands?.length > 0) {
      setSelectedBrands(state?.brands as any); // تنظیم برندهای موجود در کوئری
    }
  }, []);

  return (
    <div className="w-full">
      {/* قسمت جستجو */}
      <div className="grid gap-2 mb-6 sticky top-0">
        <Input
          onChange={(e) => setSearchQuery(e.target.value)} // بروزرسانی وضعیت جستجو
          placeholder="جستجو در برندها"
          iconPosition="end"
          icon={<Icon icon={"solar:magnifer-outline"} className="size-5" />} // آیکن جستجو
        />
      </div>
      
      <div className="w-full">
        {/* نمایش حالت لودینگ */}
        {isLoading ? (
          <>
            <BrandsListItemShimmer />
            <BrandsListItemShimmer />
            <BrandsListItemShimmer />
            <BrandsListItemShimmer />
            <BrandsListItemShimmer />
          </>
        ) : (
          // نمایش برندها پس از لود شدن
          brands
            .filter((item: BrandItemType) => item.title.includes(searchQuery))
            .map((item: BrandItemType) => (
              <div
                key={item.id}
                className="w-full cursor-pointer py-3 flex items-center justify-between"
              >
                <div className="flex gap-x-4">
                  {/* چک‌باکس برای انتخاب برند */}
                  <Checkbox
                    value={item.id}
                    checked={selectedBrands.includes(String(item.id))} // بررسی وضعیت انتخاب برند
                    onCheckedChange={(status: boolean) => {
                      handleSelectBrand(status, item.id); // فراخوانی تابع انتخاب برند
                    }}
                  />
                  <span>{item.title}</span>
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
};

// کامپوننت شایمر (بارگذاری موقتی) برای برندها
export const BrandsListItemShimmer = () => (
  <div className="w-full py-3 flex items-center justify-between ">
    <div className="flex gap-x-4 items-center">
      <span className="w-6 h-6 block bg-gray-200 animate-pulse rounded"></span>
      <span className="w-28 h-3 block bg-gray-200 animate-pulse rounded"></span>
    </div>
  </div>
);

export default BrandsListSelector;