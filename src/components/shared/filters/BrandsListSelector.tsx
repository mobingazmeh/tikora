"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { BrandItemType, useGetBrandsListQuery } from "@/services/brands/useGetBrandsListQuery";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useCallback, useMemo, useState } from "react";
import useQueryManager from "@/lib/utils/useQueryManager";

const BrandsListSelector = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data, isLoading } = useGetBrandsListQuery({});
  const { state, setState, deleteState } = useQueryManager();

  // مقداردهی برندهای انتخاب‌شده فقط وقتی state تغییر کنه
  const selectedBrands = useMemo(() => {
    if (!state.brands) return [];
    return Array.isArray(state.brands) ? state.brands.map(String) : [String(state.brands)];
  }, [state.brands]);

  const brands = data?.result || [];

  // انتخاب یا حذف برند از لیست انتخاب‌شده
  const handleSelectBrand = useCallback((status: boolean, id: string | number) => {
    const stringId = String(id);
    const isAlreadySelected = selectedBrands.includes(stringId);

    // جلوگیری از setState تکراری
    if (status && isAlreadySelected) return;
    if (!status && !isAlreadySelected) return;

    const newSelectedBrands = status 
      ? [...selectedBrands, stringId]
      : selectedBrands.filter((x) => x !== stringId);

    if (newSelectedBrands.length === 0) {
      deleteState(["brands"]);
    } else {
      setState({ 
        brands: newSelectedBrands,
        page: 1, // ریست کردن صفحه به ۱ در صورت تغییر فیلتر
      });
    }
  }, [selectedBrands, setState, deleteState]);

  return (
    <div className="w-full">
      <div className="grid gap-2 mb-6 sticky top-0">
        <Input
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="جستجو در برندها"
          iconPosition="end"
          icon={<Icon icon={"solar:magnifer-outline"} className="size-5" />}
        />
      </div>
      
      <div className="w-full">
        {isLoading ? (
          <>
            <BrandsListItemShimmer />
            <BrandsListItemShimmer />
            <BrandsListItemShimmer />
            <BrandsListItemShimmer />
            <BrandsListItemShimmer />
          </>
        ) : (
          brands
            .filter((item: BrandItemType) => 
              item.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((item: BrandItemType) => (
              <div
                key={item.id}
                className="w-full cursor-pointer py-3 flex items-center justify-between"
              >
                <div className="flex gap-x-4">
                  <Checkbox
                    value={item.id}
                    checked={selectedBrands.includes(String(item.id))}
                    onCheckedChange={(status: boolean) => {
                      handleSelectBrand(status, item.id);
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

export const BrandsListItemShimmer = () => (
  <div className="w-full py-3 flex items-center justify-between ">
    <div className="flex gap-x-4 items-center">
      <span className="w-6 h-6 block bg-gray-200 animate-pulse rounded"></span>
      <span className="w-28 h-3 block bg-gray-200 animate-pulse rounded"></span>
    </div>
  </div>
);

export default BrandsListSelector;
