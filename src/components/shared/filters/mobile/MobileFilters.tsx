"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Switch } from "@/components/ui/switch";
import useQueryManager from "@/lib/utils/useQueryManager";

import { cn } from "@/lib/utils";
import BrandsListSelector from "../BrandsListSelector";
import CategoriesSelector from "../CategoriesSelector";
import PriceRangeSelector from "../PriceRangeSelector";


// کامپوننت فیلترهای موبایل
const MobileFilters = () => {
  // گرفتن وضعیت فیلترها و توابع برای تغییر وضعیت آنها
  const { state, setState, deleteState } = useQueryManager();

  // بررسی فعال بودن فیلترهای مختلف
  const hasCategoryFilter = !!state.category;
  const hasBrandFilter = !!state.brands;
  const hasPriceFilter = !!state.price_start || !!state.price_end;

  return (
    <div>
      {/* کامپوننت آکورديون برای فیلترهای مختلف */}
      <Accordion type="multiple" className="w-full p-1">
        {/* فیلتر دسته‌بندی */}
        <AccordionItem value="item-1">
          <AccordionTrigger
            // استایل خاص برای فیلترهای فعال
            className={cn(hasCategoryFilter && "!text-extrabold text-green")}
          >
            <span className="block relative">
              {hasCategoryFilter && (
                <span className="w-2 h-2 absolute -left-6 block bg-green rounded-full"></span>
              )}
              <span>دسته بندی</span>
            </span>
          </AccordionTrigger>
          <AccordionContent className="max-h-80 overflow-auto">
            {/* انتخاب دسته‌بندی */}
            <CategoriesSelector onChange={(id) => setState({ category: id })} />
          </AccordionContent>
        </AccordionItem>

        {/* فیلتر برند */}
        <AccordionItem value="item-2">
          <AccordionTrigger
            // استایل خاص برای فیلترهای فعال
            className={cn(hasBrandFilter && "!text-extrabold text-green")}
          >
            <span className="block relative">
              {hasBrandFilter && (
                <span className="w-2 h-2 absolute -left-6 block bg-green rounded-full"></span>
              )}
              <span> برند ها </span>
            </span>
          </AccordionTrigger>
          <AccordionContent className="max-h-80 overflow-auto">
            {/* انتخاب برندها */}
            <BrandsListSelector />
          </AccordionContent>
        </AccordionItem>

        {/* فیلتر قیمت */}
        <AccordionItem value="item-3">
          <AccordionTrigger
            // استایل خاص برای فیلترهای فعال
            className={cn(hasPriceFilter && "!text-extrabold text-green")}
          >
            <span className="block relative">
              {hasPriceFilter && (
                <span className="w-2 h-2 absolute -left-6 block bg-green rounded-full"></span>
              )}
              <span> قیمت </span>
            </span>
          </AccordionTrigger>
          <AccordionContent>
            {/* انتخاب بازه قیمت */}
            <PriceRangeSelector />
          </AccordionContent>
        </AccordionItem>

        {/* سوئیچ برای فیلتر محصولات موجود */}
        <div className="flex items-center justify-between py-3 border-b">
          <span>فقط محصولات موجود</span>
          <span dir="ltr">
            {/* سوئیچ برای فعال/غیرفعال کردن فیلتر محصولات موجود */}
            <Switch
              checked={!!state.exist_products}
              onCheckedChange={(status: boolean) => {
                if (status) {
                  setState({ exist_products: true }); // فعال کردن فیلتر
                } else {
                  deleteState(["exist_products"]); // حذف فیلتر
                }
              }}
            />
          </span>
        </div>
      </Accordion>
    </div>
  );
};

export default MobileFilters;

