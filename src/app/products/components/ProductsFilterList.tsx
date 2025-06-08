import DesktopFilters from "@/components/shared/filters/desktop/DesktopFilters";
import DesktopSelectedFilters from "@/components/shared/filters/desktop/DesktopSelectedFilters";
import DesktopSort from "@/components/shared/filters/desktop/DesktopSort";
import MobileProductsFilter from "@/components/shared/filters/mobile/MobileProductsFilter";
import PaginationCom from "@/components/shared/pagination/Pagination";
import ProductListItem from "@/components/shared/product-item/ProductListItem";
import {
  getCachedProductsReq
} from "@/services/products/useGetProductsQuery";
import NotFoundProducts from "./NotFoundProducts";

interface ProductsFilterListProps {
  market_id?: string;
  searchParams?: any;
}




const ProductsFilterList = async ({
  market_id,
  searchParams,
}: ProductsFilterListProps) => {
  const filter = await searchParams;

  const response = await getCachedProductsReq({
    page: Number(filter?.page) || 1,
    search: filter?.search as string,
    categories: filter?.category ? [Number(filter.category)] : [],
    brands: filter?.brands ? [Number(filter.brands)] : [],
    just_exist: filter?.exist_products ? 1 : 0,
    price_range: filter?.price_start && filter?.price_end 
      ? [Number(filter.price_start), Number(filter.price_end)]
      : null,
    sort: filter?.sort_by ? `${filter.sort_order},${filter.sort_by}` as any : undefined
  });
  return (
    <div className="    p-1  mb-8">
      {/*Market internal Search input */}

      <div className="w-full flex mt-4 gap-x-4  items-start">
        {/* Side bar (filters) */}
        <div className="sm:block hidden max-w-xs w-full sticky top-20 rounded-lg border p-4  h-fit">
          <DesktopFilters />
        </div>

        <div className="flex-1">
          <div className="w-full sm:block hidden">
            <DesktopSort />
          </div>
          <div className="w-full sm:block hidden ">
            <DesktopSelectedFilters />
          </div>

          <div className="w-full sm:hidden block mb-2  ">
            <MobileProductsFilter />
          </div>

          {/* products list  */}
          {response.result.products?.length > 0 ? (
            <div className="flex-1 grid sm:grid-cols-4 grid-cols-2   divide-box    ">
              {response.result.products.map((item) => (
                <div key={item.id} className="hover:bg-gray-50 p-2  ">
                  <ProductListItem item={item} />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex-1 col-span-full flex justify-center items-center     ">
              <NotFoundProducts />
            </div>
          )}
        </div>
      </div>

      {response.result.products?.length > 0 && (
        <div className="my-6">
          <PaginationCom
            currentPage={response.paginate.current_page}
            perPage={response.paginate.per_page}
            total={response.paginate.total}
            last_page={response.paginate.last_page}

          />
        </div>
      )}
    </div>
  );
};

export default ProductsFilterList;
