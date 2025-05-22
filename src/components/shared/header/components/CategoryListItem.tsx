import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { CategoryItemType } from "@/services/categories/useGetCategoriesListQuery";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";

interface CategoryListItemProps {
  item: CategoryItemType;
  onSelect: (id: number) => void;
}

// کامپوننت CategoryListItem که هر آیتم دسته‌بندی را نمایش می‌دهد
const CategoryListItem = ({ item, onSelect }: CategoryListItemProps) => {
  // اگر آیتم دارای زیر دسته‌ها باشد
  if (item?.children?.length > 0)
    return (
      <div key={item.id} className="w-full cursor-pointer py-3 flex items-center justify-between">
        <div className="flex gap-x-4">
          {/* نمایش تصویر اگر پوشش (cover) داشته باشد */}
          {!!item.cover && (
            <span className="">
              <Image
                width={24}
                height={24}
                className="w-6 h-6"
                src={item.cover}
                alt={item.title}
              />
            </span>
          )}
          <span>{item.title}</span>
        </div>
        {/* آیکن نشان‌دهنده امکان گسترش یا باز شدن زیر دسته‌ها */}
        <span>
          <Icon className="size-6" icon={"solar:alt-arrow-down-outline"} />
        </span>
      </div>
    );
  else
    // اگر آیتم زیر دسته نداشته باشد، از RadioGroupItem برای انتخاب استفاده می‌کنیم
    return (
      <div key={item.id} className="w-full py-3 flex items-center justify-between">
        <div className="flex gap-x-4">
          <RadioGroupItem
            onClick={() => onSelect?.(item.id)} // انتخاب آیتم هنگام کلیک
            value={item.id + ""}
            id={"cate-" + item.id} // شناسه یکتا برای هر آیتم
          />
          <Label htmlFor={"cate-" + item.id} className="flex items-center cursor-pointer">
            <span className="text-caption-dark">{item.title}</span>
          </Label>
        </div>
      </div>
    );
};

// صادر کردن کامپوننت CategoryListItem
export default CategoryListItem;

// کامپوننت برای نمایش شبیه‌ساز بارگذاری دسته‌بندی‌ها (شیمر)
export const CategoriesListItemShimmer = () => (
  <div className="w-full py-3 flex items-center justify-between">
    <div className="flex gap-x-4 items-center">
      {/* نمایش انیمیشن بارگذاری برای تصویر و نام */}
      <span className="w-6 h-6 block bg-gray-200 animate-pulse rounded"></span>
      <span className="w-28 h-3 block bg-gray-200 animate-pulse rounded"></span>
    </div>
    {/* آیکن شبیه‌سازی شده */}
    <Icon className="size-6" icon={"solar:alt-arrow-down-outline"} />
  </div>
);