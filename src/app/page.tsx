import { getCachedHomeData } from "@/services/home/useGetHomeDataQuery";
import QuickAccess from "@/components/shared/quick-access/QuickAccess";
import AmazingSlider from "@/components/shared/sliders/amazing-slider/AmazingSlider";
import MainSlider from "@/components/shared/sliders/main-slider/MainSlider";
import ProductSlider from "@/components/shared/sliders/product-slider/ProductSlider";
import Banner from "@/components/shared/banner/Banner";
import {
  BaseHomeItemDataType,
  HomeItemType,
} from "@/lib/types/HomeServiceTypes";
import { FC } from "react";

const COMPONENT_MAP: { [key in HomeItemType]: FC<any> | undefined } = {
  slider_image: MainSlider,
  quick_access: QuickAccess,
  amazing_products: AmazingSlider,
  slider_products: ProductSlider,
  banner: Banner,
  special_markets: undefined,
  product_groups: undefined,
  brands: undefined,
  blog: undefined,
  sliders: undefined,
  products: undefined,
};

const shouldRenderItem = (item: BaseHomeItemDataType) => {
  if (item.show_in === 1) return "";
  if (item.show_in === 2) return "hidden sm:block";
  if (item.show_in === 3) return "sm:hidden block";
  return "";
};

export default async function Page() {
  const data = await getCachedHomeData();

  // تبدیل آبجکت result به آرایه واحد از آیتم‌ها
  // دقت کنید که data.result یک آبجکت هست که هر کلیدش آرایه‌ای از آیتم‌هاست
  const homeDataArrays = Object.values(data.result || {}); // آرایه از آرایه‌ها
  const homeData = homeDataArrays.flat(); // آرایه‌ی واحد شامل همه آیتم‌ها
console.log("data",data)
console.log("homeData",homeData)
console.log("homeDataArrays",homeDataArrays)


  return (
    <div className="p-6 space-y-6 max-w-md mx-auto">
      {homeData.map((item, index) => {
        const Component = COMPONENT_MAP[item.component as HomeItemType];
        if (!Component) return null;

        return (
          <div key={index} className={shouldRenderItem(item)}>
            <Component {...item} />
          </div>
        );
      })}
    </div>
  );
}
