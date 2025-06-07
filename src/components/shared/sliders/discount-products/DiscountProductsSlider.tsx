"use client";

import ProductSlider from "@/components/shared/sliders/product-slider/ProductSlider";
import { ProductItemType } from "@/lib/types/CommonTypes";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface DiscountProductsSliderProps {
  data: ProductItemType[];
  title?: string;
}

export default function DiscountProductsSlider({ data, title = "تخفیف دار" }: DiscountProductsSliderProps) {
  return (
    <div className="relative rounded-xl overflow-hidden bg-white shadow-lg border-2 border-green">
      <div className="w-full bg-green px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <Icon icon="mdi:percent" className="w-6 h-6 text-white" />
            </div>
            <div className="text-white">
              <h3 className="text-2xl font-bold">تخفیف ویژه</h3>
              <p className="text-sm opacity-90">تا 50% تخفیف</p>
            </div>
          </div>
          <Link href={{ pathname: "/products", query: { sort: "discount_products" } }}>
            <Button
              animation
              iconPosition="end"
              icon={
                <Icon
                  icon={"fluent:chevron-left-12-filled"}
                  className="size-6"
                />
              }
              variant={"glass"}
              className="border text-white hover:border-white hover:bg-white/10 px-3 gap-1"
            >
              <span className="text-xs">مشاهده همه</span>
            </Button>
          </Link>
        </div>
      </div>

      <ProductSlider 
        data={data} 
        title={title}
        slidesPerView={6.2}
      />
    </div>
  );
}