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
  const [activeTab, setActiveTab] = useState<"new_products" | "acs_price_products">("new_products");

  return (
    <div className="relative rounded-xl continer pb-6  bg-white">
      <div className="w-full flex flex-col sm:flex-row px-4 justify-between items-center h-auto sm:h-20 gap-4 sm:gap-0">
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Button
            variant={activeTab === "new_products" ? "default" : "outline"}
            onClick={() => setActiveTab("new_products")}
            className={`px-6 w-full sm:w-auto text-sm sm:text-base ${
              activeTab === "new_products" 
                ? "bg-[#00704a] text-white hover:bg-[#00704a]/90" 
                : "border-[#00704a] text-[#00704a] hover:bg-[#00704a]/10"
            }`}
          >
            {newProducts.title}
          </Button>
          <Button
            variant={activeTab === "acs_price_products" ? "default" : "outline"}
            onClick={() => setActiveTab("acs_price_products")}
            className={`px-6 w-full sm:w-auto text-sm sm:text-base ${
              activeTab === "acs_price_products" 
                ? "bg-green text-white hover:bg-green/90" 
                : "border-green text-green hover:bg-green/10"
            }`}
          >
            {bestSellerProducts.title}
          </Button>
        </div>
        <Link  href={{ 
            pathname: "/products", 
            query: { 
              sort: activeTab === "new_products" ? "desc" : "best_seller_products" 
            } 
          }}  className="w-full sm:w-auto">
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
              className="border border-green text-green w-full sm:w-auto px-3 gap-1"
            >
              <span className="text-xs">مشاهده همه</span>
            </Button>
          </Link>
      </div>
      
      <div className="">
        {activeTab === "new_products" && (
          <ProductSlider 
            data={newProducts.data} 
            title={newProducts.title} 
            template_data={newProducts.template_data}
            slidesPerView={6.2}
          />
        )}
        {activeTab === "acs_price_products" && (
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