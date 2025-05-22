
import QuickAccess from "@/components/shared/quick-access/QuickAccess";
import AmazingSlider from "@/components/shared/sliders/amazing-slider/AmazingSlider";
import MainSlider from "@/components/shared/sliders/main-slider/MainSlider";
import ProductSlider from "@/components/shared/sliders/product-slider/ProductSlider";
import {
  BaseHomeItemDataType,
  HomeItemType,
} from "@/lib/types/HomeServiceTypes";
import { cn } from "@/lib/utils";
import { useGetHomeDataReqMutation } from "@/services/home/useGetHomeDataQuery";
import { FC } from "react";

const COMPONENT_MAP: { [key in HomeItemType]: FC<any> | undefined } = {
  sliders: MainSlider,  
  quick_access: QuickAccess, 
  amazing_products: AmazingSlider, 
  products: ProductSlider, 
  special_markets: undefined, 
  product_groups: undefined, 
  brands: undefined, 
  blog: undefined, 
};

const shouldRenderItem = (item: BaseHomeItemDataType) => {
  if (item.show_in === 1) return ""; 
  if (item.show_in === 2) return "hidden sm:block";
  if (item.show_in === 3) return "sm:hidden block"; 
  return ""; 
};
export default async function Page() {
 // const homeData = data.results;
 console.log("getCachedHomeData",useGetHomeDataReqMutation)

  return (
   
    <div className="p-6 space-y-6 max-w-md mx-auto">
      
    </div>
  );
}
