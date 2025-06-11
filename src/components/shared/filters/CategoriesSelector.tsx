import { Icon } from "@iconify/react/dist/iconify.js";
import {  useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import useQueryManager from "@/lib/utils/useQueryManager";
import {
  useGetCategoriesListQuery,
  
} from "@/services/categories/useGetCategoriesListQuery";
import { CategoriesListItemShimmer } from "../header/components/CategoryListItem";

// کامپوننت انتخاب دسته‌بندی
export default function CategoriesSelector({
  className,
}: React.ComponentProps<"form"> & { onChange: (id: any) => void }) {
  // گرفتن دسته‌بندی‌ها
  const { data, isLoading } = useGetCategoriesListQuery({
    type: "product",
    WithOutChildren: 0,
    limit: 100,
  });

  const { state, deleteState, setState } = useQueryManager();
  const categoryQueryItemId = state?.category;

  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = useMemo(() => {
    const all = Array.isArray(data?.result) ? data.result : [];
    return all.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [data?.result, searchQuery]);

  return (
    <div className={cn("flex flex-col h-full flex-1 w-full", className)}>
      <div className="grid gap-2 mb-6 sticky top-0">
        <Input
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="جستجو در دسته‌بندی‌ها"
          iconPosition="end"
          icon={<Icon icon="solar:magnifer-outline" className="size-5" />}
        />
      </div>

      <div className="overflow-auto">
        <RadioGroup>
          <div className="grid gap-2 divide-y">
            {!isLoading && filteredCategories.length > 0
              ? filteredCategories.map((cat) => {
                  const isActive = categoryQueryItemId === String(cat.id);
                  return (
                    <div
                      key={cat.id}
                      className="w-full py-3 flex items-center justify-between cursor-pointer"
                      onClick={() => {
                        if (isActive) deleteState(["category"]);
                        else setState({ category: cat.id });
                      }}
                    >
                      <div className="flex gap-x-4">
                        <RadioGroupItem
                          value={String(cat.id)}
                          checked={isActive}
                          id={`cate-${cat.id}`}
                        />
                        <Label
                          htmlFor={`cate-${cat.id}`}
                          className="flex items-center cursor-pointer"
                        >
                          <span className="text-caption-dark">{cat.title}</span>
                        </Label>
                      </div>
                    </div>
                  );
                })
              : Array(3)
                  .fill(0)
                  .map((_, index) => <CategoriesListItemShimmer key={index} />)}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}
