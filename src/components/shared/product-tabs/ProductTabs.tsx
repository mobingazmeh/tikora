"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import ProductSlider from "@/components/shared/sliders/product-slider/ProductSlider";
import { ProductItemType } from "@/lib/types/CommonTypes";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";


interface ProductTabsProps {
  newProducts: {
    data: ProductItemType[];
    title: string;
    template_data: string;
    col_lg: string;
    col_md: string;
    col_sm: string;
    order: number;
    row: number;
    query: {
      category_id: null;
      sort: string;
    };
  };
  bestSellerProducts: {
    data: ProductItemType[];
    title: string;
    template_data: string;
    col_lg: string;
    col_md: string;
    col_sm: string;
    order: number;
    row: number;
    query: {
      category_id: null;
      sort: string;
    };
  };
}

export default function ProductTabs({ newProducts, bestSellerProducts }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<"new" | "best">("new");

  return (
    <div className="relative rounded-xl continer pb-6  bg-white">
      <div className="w-full flex px-4 justify-between items-center h-20">
        <div className="flex gap-2">
          <Button
            variant={activeTab === "new" ? "default" : "outline"}
            onClick={() => setActiveTab("new")}
            className={`px-6 ${
              activeTab === "new" 
                ? "bg-[#00704a] text-white hover:bg-[#00704a]/90" 
                : "border-[#00704a] text-[#00704a] hover:bg-[#00704a]/10"
            }`}
          >
            {newProducts.title}
          </Button>
          <Button
            variant={activeTab === "best" ? "default" : "outline"}
            onClick={() => setActiveTab("best")}
            className={`px-6 ${
              activeTab === "best" 
                ? "bg-green text-white hover:bg-green/90" 
                : "border-green text-green hover:bg-green/10"
            }`}
          >
            {bestSellerProducts.title}
          </Button>
        </div>
        <Link href={{ pathname: "/products", query: { sort: "" } }}>
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
              className="border border-green text-green   px-3 gap-1"
            >
              <span className="text-xs">مشاهده همه</span>
            </Button>
          </Link>
      </div>
      
      <div className="">
        {activeTab === "new" && (
          <ProductSlider 
            data={newProducts.data} 
            title={newProducts.title} 
            template_data={newProducts.template_data}
            slidesPerView={6.2}
          />
        )}
        {activeTab === "best" && (
          <ProductSlider 
            data={bestSellerProducts.data} 
            title={bestSellerProducts.title} 
            template_data={bestSellerProducts.template_data}
            slidesPerView={6.2}
          />
        )}
      </div>
    </div>
  );
}