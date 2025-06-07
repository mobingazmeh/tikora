import AddToBasketButton from "@/components/shared/add-to-basket-button/AddToBasketButton";
import { BreadCrumbCustom } from "@/components/shared/breadcrumb/BreadCrumbCustom";
import ProductSlider from "@/components/shared/sliders/product-slider/ProductSlider";
import { Button } from "@/components/ui/button";
import { getCachedProductDetailsReq } from "@/services/products/useGetProductDetailsQuery";
import { Icon } from "@iconify/react/dist/iconify.js";
import ProductDescription from "./components/ProductDescription";
import ProductImageSlider from "./components/ProductImageSlider";
type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const data = await getCachedProductDetailsReq({
    productId: Number(id),
  });

  const product = data?.result;
  return {
    title: product?.title,
    description: product?.brief,
    openGraph: {
      title: product?.title,
      description: product?.brief,
      images: [product?.cover],
    },
  };
}


const page = async ({ params }:Props) => {
  const { id } = await params;
  console.log("📦 دریافت اطلاعات محصول با ID:", id);

  try {
    const data = await getCachedProductDetailsReq({
      productId: Number(id),
    });

    console.log("📦 پاسخ API:", data);

    if (!data || !data.result) {
      console.error("❌ اطلاعات محصول یافت نشد");
      return <div className="p-4 text-center">محصول یافت نشد</div>;
    }

    const product = data.result;
    console.log("📦 اطلاعات محصول:", product);
console.log(product.similars)
    return (
      <div className="w-full max-w-container-lg h-auto mx-auto my-20">
        <div className="w-full max-w-5xl mx-auto sm:bg-white bg-natural">
          <div className="py-2 mt-4">
            <BreadCrumbCustom
              items={[
                {
                  link: "/",
                  title: "خانه ",
                },
                {
                  link: "/products",
                  title: "محصولات",
                },
                {
                  link: `/products/details/${product.id}`,
                  title: product.title,
                },
              ]}
            />
          </div>
          <div className="bg-white">
            <div className="w-full h-auto mt-11 grid grid-cols-7 gap-x-4 items-start">
              <div className="flex-1 px-4 flex flex-col gap-y-4 col-span-full sm:col-span-3 sm:order-1 order-2">
                <h1 className="mb-4 text-md text-black font-medium default-cursor">
                  {product.title}
                </h1>
                <div className="w-full flex justify-between items-center">
                  <div className="flex gap-x-4 items-center">
                    <span className="text-3xl font-medium text-black/90">
                      {new Intl.NumberFormat("fa-IR").format(product.sale_price)}
                      <span className="mr-2 text-md">تومان</span>
                    </span>
                    {product.is_discount === 1 && (
                      <>
                        <s className="text-caption">
                          {new Intl.NumberFormat("fa-IR").format(product.old_price)}
                        </s>
                        <span className="bg-primary-500 text-[11px] rounded-full h-5 px-2 flex items-center justify-center">
                          {product.value_discount}%
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <div className="w-full min-w-fit sm:static fixed bottom-0 left-0 bg-white z-[100] sm:p-0 sm:h-12 p-3 gap-x-2 flex items-stretch">
                  <Button
                    className="border-green hover:bg-white hover:text-green/60 text-green h-12 rounded-lg"
                    icon={
                      <Icon
                        icon={"solar:chat-round-line-linear"}
                        className="!size-6"
                      />
                    }
                    variant={"outline"}
                  >
                    <span>چت</span>
                  </Button>
                  <Button
                    className="border-green h-12 hover:bg-white hover:text-green/60 text-green rounded-lg"
                    icon={
                      <Icon
                        icon={"solar:phone-calling-linear"}
                        className="!size-6"
                      />
                    }
                    variant={"outline"}
                  >
                    <span>تماس</span>
                  </Button>

                  <div className="w-full flex-1 min-w-fit">
                    <AddToBasketButton 
                      product={{
                        id: product.id,
                        type: product.sale_type as 'simple' | 'variable'
                      }}
                    />
                  </div>
                </div>

                <ProductDescription product={product} />
              </div>

              <div className="flex h-fit sm:sticky top-20 sm:order-2 order-1 sm:col-span-4 col-span-full justify-end">
                <div className="sm:w-[440px] sm:h-[490px] w-full">
                  <ProductImageSlider product={product} />
                </div>
                <div className="w-10 flex-col sm:flex hidden">
                  <Button variant={"ghost"} size={"icon"}>
                    <Icon icon={"solar:bookmark-linear"} />
                  </Button>
                  <Button variant={"ghost"} size={"icon"}>
                    <Icon icon={"solar:share-line-duotone"} />
                  </Button>
                </div>
              </div>
            </div>
          </div>

       {/* محصولات مشابه */}
{product.similars?.length > 0 && (
  <div className="w-full my-8 ">
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4 px-4">محصولات مشابه</h2>
      <ProductSlider
        slidesPerView={5}
        data={product.similars}
      />
    </div>
  </div>
)}

{/* محصولات مرتبط    
{product.related?.length > 0 && (
  <div className="w-full my-8">
    <div>
      <h2 className="text-xl font-bold mb-4 px-4">محصولات مرتبط</h2>
      <ProductSlider
        slidesPerView={5}
        data={product.related}
      />
    </div>
  </div>
)}*/}

        </div>
      </div>
    );
  } catch (error) {
    console.error("❌ خطا در دریافت اطلاعات محصول:", error);
    return <div className="p-4 text-center">خطا در دریافت اطلاعات محصول</div>;
  }
};

export default page;
