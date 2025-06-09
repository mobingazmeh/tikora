import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { RadioGroup } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { flatter } from "@/lib/utils/helper";
import {
  CategoryItemType,
  CategoryResponseType,
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
  const { data, isLoading, error } = useGetCategoriesListQuery({
    type: 'product',
    WithOutChildren: 0,
    limit: 100
  });

  useEffect(() => {
    console.log("📦 Categories data:", data);
    console.log("🔄 Loading state:", isLoading);
    console.log("❌ Error state:", error);
  }, [data, isLoading, error]);

  const [selectedCategory, setSelectedCategory] = useState<CategoryItemType | null>(null);
  
  // صاف کردن دسته‌بندی‌ها به صورت یکنواخت
  const flatCategories = useMemo(() => {
    if (data?.result) {
      console.log("✅ Categories before flattening:", data.result);
      const flattened = flatter(data.result, "children");
      console.log("✅ Flattened categories:", flattened);
      return flattened;
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
    if (item.children.length > 0) {
      setSelectedCategory(item);
    } else {
      onChange(item.id);
    }
  };

  // مرتب‌سازی دسته‌بندی‌ها بر اساس تعداد زیرگروه‌ها و فیلتر بر اساس جستجو
  const handleSortAndFilter = (list: CategoryItemType[]) => {
    return list
      .sort((a, b) => {
        // اول دسته‌بندی‌های با زیرگروه
        if (a.children.length > 0 && b.children.length === 0) return -1;
        if (a.children.length === 0 && b.children.length > 0) return 1;
        // سپس بر اساس تعداد زیرگروه‌ها
        return b.children.length - a.children.length;
      })
      .filter((item) => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
  };

  // آماده‌سازی لیست مرتب‌شده و فیلترشده دسته‌بندی‌ها
  const organizedItems = useMemo(() => {
    if (selectedCategory) {
      return handleSortAndFilter(selectedCategory.children);
    }
    // اصلاح دسترسی به داده‌ها
    const categories: CategoryItemType[] = Array.isArray(data?.result) 
  ? data.result 
  : data?.result?.result || [];
    console.log("📊 Categories before organization:", categories);
    const organized = handleSortAndFilter(categories);
    console.log("📊 Organized items:", organized);
    return organized;
  }, [selectedCategory, data?.result, searchQuery]);

  return (
    <form className={cn("flex flex-col h-full flex-1 w-full", className)}>
      {/* فیلد جستجو */}
      <div className="grid gap-2 mb-4 sticky top-0 bg-white z-10 p-2">
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="جستجو در دسته‌بندی ها"
          iconPosition="end"
          icon={<Icon icon={"solar:magnifer-outline"} className="size-5" />}
        />
      </div>

      {/* نمایش مسیر دسته‌بندی انتخاب شده */}
      {selectedCategory && (
        <div className="py-2 px-4 flex items-center gap-x-2 bg-gray-50 border-b">
          <button
            type="button"
            onClick={() => handleGoBack(selectedCategory)}
            className="p-1 hover:bg-gray-200 rounded-full transition-colors"
          >
            <Icon icon={"solar:arrow-right-line-duotone"} className="size-5" />
          </button>
          {selectedCategory.cover && (
            <Image
              width={24}
              height={24}
              src={selectedCategory.cover}
              alt={selectedCategory.title}
              className="rounded-full"
            />
          )}
          <span className="font-medium text-gray-700">
            {selectedCategory.title}
          </span>
        </div>
      )}

      {/* لیست دسته‌بندی‌ها */}
      <div className="overflow-auto flex-1">
        <RadioGroup>
          <div className="divide-y divide-gray-100">
            {!isLoading && data?.result ? (
              organizedItems.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => handleSelectCategory(item)}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <CategoryListItem
                    onSelect={onChange}
                    item={item}
                  />
                </div>
              ))
            ) : (
              Array(6).fill(1).map((_, index) => (
                <CategoriesListItemShimmer key={index} />
              ))
            )}
          </div>
        </RadioGroup>
      </div>
    </form>
  );
}