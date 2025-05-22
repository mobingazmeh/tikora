import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { flatter } from "@/lib/utils/helper";
import useQueryManager from "@/lib/utils/useQueryManager";
import {
  CategoryItemType,
  useGetCategoriesListQuery,
} from "@/services/categories/useGetCategoriesListQuery";
import { CategoriesListItemShimmer } from "../header/components/CategoryListItem";

// کامپوننت انتخاب دسته‌بندی
export default function CategoriesSelector({
  className,
}: React.ComponentProps<"form"> & { onChange: (id: any) => void }) {
  // درخواست برای دریافت لیست دسته‌بندی‌ها
  const { data, isLoading } = useGetCategoriesListQuery({
    
    OnlyHasCover: 0,
    OnlyHasIcon: 0,
    limit: 0,
    WithOutChildren: 0,
    type: 'product'
  });

  console.log(data?.result)
  // مدیریت وضعیت کوئری
  const { state, deleteState, setState } = useQueryManager();
  const categoryQueryItemId = state?.category;

  const [searchQuery, setSearchQuery] = useState(""); // وضعیت جستجو
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryItemType | null>(null); // وضعیت دسته‌بندی انتخاب‌شده

  // تخت کردن دسته‌بندی‌ها برای نمایش بهتر
  const flatCategories = useMemo(
    () =>
      data?.result ? flatter(data.result, "children") : [],
    [data?.result]
  );

  // برگشت به دسته‌بندی والد
  const handleGoBack = useCallback(
    (item: CategoryItemType) => {
      const parent = flatCategories.find(
        (category) => category.id === item.parent?.id
      );
      setSelectedCategory(parent || null);
    },
    [flatCategories]
  );

  // انتخاب دسته‌بندی
  const handleSelectCategory = (item: CategoryItemType) => {
    if (item?.children?.length > 0) setSelectedCategory(item); // اگر دسته فرزند دارد، به آن دسته برو
  };

  // مرتب‌سازی بر اساس تعداد فرزندان
  const handleSortByChildrenLength = useCallback(
    (list: CategoryItemType[]) =>
      list
        .filter((item) => item.title.includes(searchQuery))
        .sort((a, b) => (b.children?.length ?? 0) - (a.children?.length ?? 0)),
    [searchQuery]
  );

  const getCategories = (data: any): CategoryItemType[] => {
    return Array.isArray(data?.result) ? data.result : [];
  };

  // مرتب‌سازی و سازماندهی آیتم‌ها
  const OrganizedItems = useMemo(() => {
    if (selectedCategory)
      return handleSortByChildrenLength(selectedCategory.children);
    return handleSortByChildrenLength(getCategories(data)?.[0]?.children || []);
  }, [selectedCategory, data, handleSortByChildrenLength]);

  // تنظیم دسته‌بندی انتخاب‌شده از URL
  useEffect(() => {
    if (flatCategories.length && categoryQueryItemId) {
      const targetCategory = flatCategories.find(
        (cat) => cat.id === Number(categoryQueryItemId)
      );
      const parentCategory = flatCategories.find(
        (cat) => cat.id === targetCategory?.parent?.id
      );
      setSelectedCategory(parentCategory || null);
    }
  }, [categoryQueryItemId, flatCategories]);

  return (
    <div
      // این کلید ضروری است زیرا بعد از انتخاب دسته‌بندی، اقدامات زنجیره‌ای انجام شده و رندر دوباره می‌شود
      key={selectedCategory?.id}
      className={cn("flex flex-col h-full flex-1 w-full", className)}
    >
      <div className="grid gap-2 mb-6 sticky top-0">
        <Input
          onChange={(e) => setSearchQuery(e.target.value)} // تغییر جستجو
          placeholder="جستجو در دسته‌بندی‌ها"
          iconPosition="end"
          icon={<Icon icon="solar:magnifer-outline" className="size-5" />}
        />
      </div>

      <div className="overflow-auto">
        {selectedCategory && (
          <div className="py-3 flex gap-x-2">
            <span
              className="cursor-pointer"
              onClick={() => handleGoBack(selectedCategory)} // برگشت به دسته‌بندی والد
            >
              <Icon icon="solar:arrow-right-line-duotone" className="size-6" />
            </span>
            {selectedCategory.cover && (
              <Image
                width={24}
                height={24}
                src={selectedCategory.cover}
                alt={selectedCategory.title}
              />
            )}
            <span className="font-bold text-caption-dark text-base">
              {selectedCategory.title}
            </span>
          </div>
        )}

        <RadioGroup>
          <div className="grid gap-2 divide-y">
            {!isLoading && getCategories(data)?.[0]?.children && OrganizedItems.length > 0
              ? OrganizedItems?.map((child) => {
                  const isActive = categoryQueryItemId === String(child.id);
                  return (
                    <div
                      key={child.id}
                      onClick={() => handleSelectCategory(child)} // انتخاب دسته‌بندی
                    >
                      {child?.children?.length > 0 ? (
                        <div
                          key={child.id}
                          className="w-full cursor-pointer py-3 flex items-center justify-between"
                        >
                          <div className="flex gap-x-4">
                            {child.cover && (
                              <Image
                                width={24}
                                height={24}
                                className="w-6 h-6"
                                src={child.cover}
                                alt={child.title}
                              />
                            )}
                            <span>{child.title}</span>
                          </div>
                          <Icon
                            className="size-6"
                            icon="solar:alt-arrow-down-outline"
                          />
                        </div>
                      ) : (
                        <div
                          key={child.id}
                          className="w-full py-3 flex items-center justify-between"
                        >
                          <div
                            onClick={() => {
                              if (isActive) deleteState(["category"]);
                              else setState({ category: child.id });
                            }}
                            className="flex gap-x-4"
                          >
                            <RadioGroupItem
                              value={String(child.id)}
                              checked={isActive}
                              id={`cate-${child.id}`}
                            />
                            <Label
                              htmlFor={`cate-${child.id}`}
                              className="flex items-center cursor-pointer"
                            >
                              <span className="text-caption-dark">
                                {child.title}
                              </span>
                            </Label>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              : Array(4)
                  .fill(0)
                  .map((_, index) => <CategoriesListItemShimmer key={index} />)}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}
