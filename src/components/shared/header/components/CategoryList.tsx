import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import { useCallback, useMemo, useState } from "react";

import { Input } from "@/components/ui/input";
import { RadioGroup } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { flatter } from "@/lib/utils/helper";
import {
  CategoryItemType,
  useGetCategoriesListQuery,
} from "@/services/categories/useGetCategoriesListQuery";

import CategoryListItem, {
  CategoriesListItemShimmer,
} from "./CategoryListItem";

export default function CategoryList({
  className,
  onChange,
}: React.ComponentProps<"form"> & { onChange: (id: any) => void }) {
  const [searchQuery, setSearchQuery] = useState("");
  const { data, isLoading } = useGetCategoriesListQuery({
    group_depth: 3,
    load_parent: true,
  });
  const [selectedCategory, setSelectedCategory] = useState<CategoryItemType | null>(null);

  // صاف کردن دسته‌بندی‌ها به صورت یکنواخت
  const flatCategories = useMemo(() => {
    if (data?.result) {
      return flatter(data.result, "children");
    }
    return [];
  }, [data?.result]);

  // بازگشت به دسته‌بندی قبلی
  const handleGoBack = useCallback(
    (item: CategoryItemType) => {
      if (item.parent?.id) {
        const target = flatCategories.find(
          (category) => category.id === item?.parent?.id
        );
        setSelectedCategory(target);
      } else {
        setSelectedCategory(null);
      }
    },
    [flatCategories]
  );

  // انتخاب دسته‌بندی و نمایش زیرگروه‌ها
  const handleSelectCategory = (item: CategoryItemType) => {
    if (item.children.length > 0) setSelectedCategory(item);
  };

  // مرتب‌سازی دسته‌بندی‌ها بر اساس تعداد زیرگروه‌ها
  const handleSortByChildrenLength = (list: CategoryItemType[]) => {
    return list
      .sort((a, b) => b?.children?.length - a?.children?.length)
      .filter((item) => item.title.includes(searchQuery));
  };

  // آماده‌سازی لیست مرتب‌شده و فیلترشده دسته‌بندی‌ها
  const OrganizedItems = () => {
    if (selectedCategory)
      return handleSortByChildrenLength(selectedCategory?.children ?? []);
    else if (data?.result?.result)
      return handleSortByChildrenLength(data.result.result);
    return [];
  };

  return (
    <form className={cn("flex flex-col h-full flex-1 w-full", className)}>
      {/* فیلد جستجو */}
      <div className="grid gap-2 mb-6 sticky top-0">
        <Input
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="جستجو در دسته‌بندی ها"
          iconPosition="end"
          icon={<Icon icon={"solar:magnifer-outline"} className="size-5" />}
        />
      </div>

      {/* نمایش دسته‌بندی‌های انتخاب‌شده و زیرگروه‌ها */}
      <div className="overflow-auto">
        {selectedCategory && (
          <div className="py-3 flex gap-x-2">
            <span
              className="cursor-pointer"
              onClick={() => handleGoBack(selectedCategory)}
            >
              <Icon icon={"solar:arrow-right-line-duotone"} className="size-6" />
            </span>
            <span className="">
              {selectedCategory.cover && (
                <Image
                  width={24}
                  height={24}
                  src={selectedCategory.cover}
                  alt={selectedCategory.title}
                />
              )}
            </span>
            <span className="font-bold text-caption-dark text-base">
              {selectedCategory?.title}
            </span>
          </div>
        )}
        <RadioGroup>
          <div className="grid gap-2 divide-y">
            {/* نمایش دسته‌بندی‌ها یا شبیه‌ساز بارگذاری */}
            {!isLoading && data?.result ? (
              OrganizedItems().map((child) => (
                <div onClick={() => handleSelectCategory(child)} key={child.id}>
                  <CategoryListItem
                    onSelect={(id) => onChange?.(id)}
                    item={child}
                  />
                </div>
              ))
            ) : (
              <>
                {Array(4)
                  .fill(1)
                  .map((_, index) => (
                    <CategoriesListItemShimmer key={index} />
                  ))}
              </>
            )}
          </div>
        </RadioGroup>
      </div>
    </form>
  );
}
