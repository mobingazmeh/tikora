import { getCachedHomeData } from "@/services/home/useGetHomeDataQuery";
import MainSlider from "@/components/shared/sliders/main-slider/MainSlider";
import Banner, { BannerProps } from "@/components/shared/banner/Banner";
import { BaseHomeItemDataType,  SliderItemType } from "@/lib/types/HomeServiceTypes";
import Category from "@/components/shared/category/Category";
import DiscountProductsSlider from "@/components/shared/sliders/discount-products/DiscountProductsSlider";
import { ProductItemType } from "@/lib/types/CommonTypes";
import ProductTabs from "@/components/shared/product-tabs/ProductTabs";
import BrandsList from "@/components/shared/brands/BrandsList";
import { CategoryItemType } from "@/services/categories/useGetCategoriesListQuery";

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

  // پیدا کردن آیتم‌های مورد نیاز
  const mainSlider = homeData.find(item => item.component === "slider_image" && item.row === 1);
  const categories = homeData.find(item => item.component === "list_categories");
  const discountProducts = homeData.find(item => item.component === "slider_products" && item.template_data === "discount_products");
  const pairedBanners = homeData.filter(item => item.component === "banner" && item.row === 3);
  const bestSellerProducts = homeData.find(item => item.component === "slider_products" && item.template_data === "best_seller_products");
  const brandSlider = homeData.find(item => item.component === "slider_image" && item.row === 6);
  const newProducts = homeData.find(item => item.component === "slider_products" && item.template_data === "desc");
  const singleBanner = homeData.find(item => item.component === "banner" && item.row === 8);
  return (
    <div className="container mx-auto px-4 space-y-6">
      {/* اسلایدر اصلی */}
      {mainSlider && (
        <div className={shouldRenderItem(mainSlider)}>
          <MainSlider data={mainSlider.data as SliderItemType[]} />
        </div>
      )}

      {/* دسته‌بندی‌ها */}
      {categories && (
        <div className={shouldRenderItem(categories)}>
          <Category data={categories.data as CategoryItemType[]} title={categories.title} />
        </div>
      )}

      {/* محصولات تخفیف‌دار */}
      {discountProducts && (
        <div className={shouldRenderItem(discountProducts)}>
          <DiscountProductsSlider data={discountProducts.data as ProductItemType[]} title={discountProducts.title} />
        </div>
      )}

      {/* بنرهای دو ستونه */}
      {pairedBanners.length > 0 && (
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${shouldRenderItem(pairedBanners[0])}`}>
          {pairedBanners.map((banner, index) => (
            <Banner key={index} data={banner.data as BannerProps['data']} title={banner.title} />
          ))}
        </div>
      )}
 {/* اسلایدر برندها */}
 {brandSlider && (
        <div className={shouldRenderItem(brandSlider)}>
          <BrandsList data={brandSlider.data as any} />
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
      {singleBanner && (
        <div className={shouldRenderItem(singleBanner)}>
          <Banner data={singleBanner.data as BannerProps['data']} title={singleBanner.title} />
        </div>
      )}
    </div>
  );
}