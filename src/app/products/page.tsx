import { BreadCrumbCustom } from "@/components/shared/breadcrumb/BreadCrumbCustom";
import React from "react";
import ProductsFilterList from "./components/ProductsFilterList";
import { getCachedProductsReq } from "@/services/products/useGetProductsQuery";
import { ProductItemType } from "@/lib/types/CommonTypes";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({
  searchParams,
}:Props) {
  const filter = await searchParams;

  const response = await getCachedProductsReq({
    page: Number(filter?.page) || 1,
    search: filter?.search as string,
    categories: filter?.categories ? [Number(filter.categories)] : [],
    brands: filter?.brands ? [Number(filter.brands)] : [],
    just_exist: filter?.just_exist ? 1 : 0,
    attributes: filter?.attributes ? [Number(filter.attributes)] : [],
    price_range: filter?.price_start && filter?.price_end 
      ? [Number(filter.price_start), Number(filter.price_end)]
      : null,
    variety: filter?.variety ? [Number(filter.variety)] : [],
    only_in_discount: filter?.only_in_discount === 'true',
    sort: filter?.sort as any,
  });
  return {
    title: response.result.group?.name || "محصولات",
    description: response.result.products.map((product: ProductItemType) => product.title).join(", ") || "لیست محصولات",
  };
}

const page = ({ searchParams }: Props) => {
  return (
    <div className="w-full max-w-container-lg h-auto mx-auto  lg:my-20">
      <div className="w-full  mx-auto sm:bg-white bg-natural">
        <div className="p-2     mt-4">
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
            ]}
          />
        </div>

        <ProductsFilterList searchParams={searchParams} />
      </div>
    </div>
  );
};

export default page;
