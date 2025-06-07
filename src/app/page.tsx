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
import Category from "@/components/shared/category/Category";
import DiscountProductsSlider from "@/components/shared/sliders/discount-products/DiscountProductsSlider";
import { ProductItemType } from "@/lib/types/CommonTypes";
import ProductTabs from "@/components/shared/product-tabs/ProductTabs";


const COMPONENT_MAP: { [key in HomeItemType]: FC<any> | undefined } = {
  slider_image: MainSlider,
  quick_access: QuickAccess,
  amazing_products: ProductSlider,
  slider_products: ProductSlider,
  banner: Banner,
  list_categories: Category,
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
  const homeDataArrays = Object.values(data?.result || {});
  const homeData = homeDataArrays.flat();
  // پیدا کردن محصولات جدید و پرفروش
  const newProducts = homeData.find(
    (item) => item.component === "slider_products" && item.template_data === "desc"
  );
  const bestSellerProducts = homeData.find(
    (item) => item.component === "slider_products" && item.template_data === "best_seller_products"
  );

  return (
    <div className="container mx-auto px-4 space-y-6 ">
      {homeData.map((item, index) => {
        // اگر محصولات تخفیف‌دار بود، از کامپوننت مخصوص استفاده کن
        if (item.component === "slider_products" && item.template_data === "discount_products") {
          return (
            <div key={index} className={shouldRenderItem(item)}>
              <DiscountProductsSlider data={item.data as ProductItemType[]} title={item.title} />
            </div>
          );
        }

        // اگر محصولات جدید یا پرفروش بود، از ProductTabs استفاده کن
        if (
          (item.component === "slider_products" && item.template_data === "desc") ||
          (item.component === "slider_products" && item.template_data === "best_seller_products")
        ) {
          // فقط یک بار ProductTabs را رندر کن
          if (item.template_data === "desc") {
            return (
              <div key={index} className={shouldRenderItem(item)}>
                <ProductTabs
                  newProducts={newProducts as any}
                  bestSellerProducts={bestSellerProducts as any}
                />
              </div>
            );
          }
          return null;
        }

        // برای بقیه آیتم‌ها از کامپوننت‌های معمولی استفاده کن
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