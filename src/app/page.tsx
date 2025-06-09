import { getCachedHomeData } from "@/services/home/useGetHomeDataQuery";
import QuickAccess from "@/components/shared/quick-access/QuickAccess";
import AmazingSlider from "@/components/shared/sliders/amazing-slider/AmazingSlider";
import MainSlider from "@/components/shared/sliders/main-slider/MainSlider";
import ProductSlider from "@/components/shared/sliders/product-slider/ProductSlider";
import Banner, { BannerProps } from "@/components/shared/banner/Banner";
import { BaseHomeItemDataType, HomeItemType, SliderItemType } from "@/lib/types/HomeServiceTypes";
import { FC } from "react";
import Category from "@/components/shared/category/Category";
import DiscountProductsSlider from "@/components/shared/sliders/discount-products/DiscountProductsSlider";
import { ProductItemType } from "@/lib/types/CommonTypes";
import ProductTabs from "@/components/shared/product-tabs/ProductTabs";
import BrandsList from "@/components/shared/brands/BrandsList";
import { CategoryItemType } from "@/services/categories/useGetCategoriesListQuery";
import { BrandItemType } from "@/services/brands/useGetBrandsListQuery";

const COMPONENT_MAP: { [key in HomeItemType]: FC<any> | undefined } = {
  slider_image: MainSlider,
  quick_access: QuickAccess,
  amazing_products: ProductSlider,
  slider_products: ProductSlider,
  banner: Banner,
  list_categories: Category,
  product_groups: undefined,
  brands: BrandsList,
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
  const discountProducts = homeData.find(
    (item) => item.component === "slider_products" && item.template_data === "discount_products"
  );
  const brandSlider = homeData.find(
    (item) => item.component === "slider_image" && item.row === 7
  );
 console.log(homeData)
  return (
    <div className="container mx-auto px-4 space-y-6">
      {/* اسلایدر اصلی */}
      {homeData.map((item, index) => {
        if (item.component === "slider_image" && item.row === 1) {
          return (
            <div key={index} className={shouldRenderItem(item)}>
              <MainSlider data={item.data as SliderItemType[]} />
            </div>
          );
        }
        return null;
      })}

      {homeData.map((item, index) => {
        if (item.component === "list_categories") {
          return (
            <div key={index} className={shouldRenderItem(item)}>
              <Category data={item.data as CategoryItemType[]} title={item.title} />
            </div>
          );
        }
        return null;
      })}

      {/* بنرهای دو ستونه */}
      {homeData.map((item, index) => {
        if (item.component === "banner" && item.row === 3) {
          return (
            <div key={index} className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${shouldRenderItem(item)}`}>
        <Banner data={item.data as BannerProps['data']} title={item.title} />
        </div>
          );
        }
        return null;
      })}

      {/* محصولات تخفیف‌دار */}
      {discountProducts && (
        <div className={shouldRenderItem(discountProducts)}>
          <DiscountProductsSlider 
            data={discountProducts.data as ProductItemType[]} 
            title={discountProducts.title} 
          />
        </div>
      )}

      {/* تب‌های محصولات جدید و پرفروش */}
      {newProducts && bestSellerProducts && (
  <div className={shouldRenderItem(newProducts)}>
    <ProductTabs
      newProducts={{
        data: newProducts.data as ProductItemType[],
        title: newProducts.title,
        template_data: newProducts.template_data || "desc",
        col_lg: newProducts.col_lg || "3",
        col_md: newProducts.col_md || "4",
        col_sm: newProducts.col_sm || "6",
        order: newProducts.order || 0,
        row: newProducts.row || 0,
        query: {
          category_id: null,
          sort: "desc"
        }
      }}
      bestSellerProducts={{
        data: bestSellerProducts.data as ProductItemType[],
        title: bestSellerProducts.title,
        template_data: bestSellerProducts.template_data || "best_seller_products",
        col_lg: bestSellerProducts.col_lg || "3",
        col_md: bestSellerProducts.col_md || "4",
        col_sm: bestSellerProducts.col_sm || "6",
        order: bestSellerProducts.order || 0,
        row: bestSellerProducts.row || 0,
        query: {
          category_id: null,
          sort: "best_seller"
        }
      }}
    />
  </div>
)}
      {/* بنر تک ستونه */}
      {homeData.map((item, index) => {
        if (item.component === "banner" && item.row === 6) {
          return (
            <div key={index} className={shouldRenderItem(item)}>
        <Banner data={item.data as BannerProps['data']} title={item.title} />
        </div>
          );
        }
        return null;
      })}

      {/* اسلایدر برندها */}
      {brandSlider && (
        <div className={shouldRenderItem(brandSlider)}>
          <BrandsList data={brandSlider.data as any} />
        </div>
      )}
    </div>
  );
}