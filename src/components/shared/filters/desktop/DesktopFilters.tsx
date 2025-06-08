"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import useQueryManager from "@/lib/utils/useQueryManager";

import BrandsListSelector from "../BrandsListSelector";
import CategoriesSelector from "../CategoriesSelector";
import PriceRangeSelector from "../PriceRangeSelector";
import { cn } from "@/lib/utils";

// این کامپوننت فیلترهای مختلف مانند دسته‌بندی، برند، قیمت و موجود بودن محصولات را نمایش می‌دهد.
const DesktopFilters = () => {
  // دریافت وضعیت فیلترها از useQueryManager
  const { state, resetStates, setState, deleteState } = useQueryManager();

  // بررسی اینکه آیا فیلترهای دسته‌بندی، برند و قیمت انتخاب شده است یا نه
  const hasCategoryFilter = !!state.category;
  const hasBrandFilter = !!state.brands;
  const hasPriceFilter = !!state.price_start || !!state.price_end;

  // تابعی برای پاک کردن همه فیلترها
  const deleteFilters = () => {
    resetStates(); // ریست کردن وضعیت فیلترها
  };

  return (
    <div>
      {/* عنوان فیلترها و دکمه برای حذف فیلترها */}
      <div className="w-full flex justify-between items-center">
        <h4 className="font-bold ">فیلتر ها</h4>
        <Button
          onClick={deleteFilters}
          variant={"glass"}
          size={"sm"}
          className="text-xs !p-0 text-green"
        >
          حذف فیلتر ها
        </Button>
      </div>

      {/* فیلترها به صورت آکوردیون نمایش داده می‌شوند */}
      <Accordion type="multiple" className="w-full">
        {/* فیلتر دسته‌بندی */}
        <AccordionItem value="item-1">
          <AccordionTrigger
            className={cn(hasCategoryFilter && "!text-extrabold text-green")}
          >
            <span className="block  relative">
              {hasCategoryFilter && (
                <span className="w-2 h-2 absolute -left-6 block bg-green rounded-full"></span>
              )}
              <span>دسته بندی</span>
            </span>
          </AccordionTrigger>
          <AccordionContent className="max-h-80 overflow-auto">
            <CategoriesSelector onChange={(id) => setState({ category: id })} />
          </AccordionContent>
        </AccordionItem>

        {/* فیلتر برندها */}
        <AccordionItem value="item-2">
          <AccordionTrigger
            className={cn(hasBrandFilter && "!text-extrabold text-green")}
          >
            <span className="block relative">
              {hasBrandFilter && (
                <span className="w-2 h-2 absolute -left-6 block bg-green rounded-full"></span>
              )}
              <span>برند ها</span>
            </span>
          </AccordionTrigger>
          <AccordionContent className="max-h-80 overflow-auto">
            <BrandsListSelector />
          </AccordionContent>
        </AccordionItem>

        {/* فیلتر قیمت */}
        <AccordionItem value="item-3">
          <AccordionTrigger
            className={cn(hasPriceFilter && "!text-extrabold text-green")}
          >
            <span className="block  relative">
              {hasPriceFilter && (
                <span className="w-2 h-2 absolute -left-6 block bg-green rounded-full"></span>
              )}
              <span >قیمت</span>
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <PriceRangeSelector />
          </AccordionContent>
        </AccordionItem>

        {/* سوئیچ "فقط محصولات موجود" */}
        <div className="flex items-center justify-between py-3 border-b">
          <span>فقط محصولات موجود</span>
          <span dir="ltr">
            <Switch
              checked={!!state.exist_products}
              onCheckedChange={(status: boolean) => {
                if (status) {
                  setState({
                    exist_products: true,
                  });
                } else {
                  deleteState(["exist_products"]);
                }
              }}

            />
          </span>
        </div>
      </Accordion>
    </div>
  );
};

export default DesktopFilters;

