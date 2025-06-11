{/*export default async function Page() {
  const data = await getCachedHomeData();
  const homeDataArrays = Object.values(data?.result || {});
  const homeData = homeDataArrays.flat();
  // پیدا کردن محصولات جدید و پرفروش
  console.log(data)
  console.log(homeData,"homeData")

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
        if (item.component === "") {
          return (
            <div key={index} className={shouldRenderItem(item)}>
              <BrandsList data={item.data as any} />
            </div>
          );
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
} */} 


















