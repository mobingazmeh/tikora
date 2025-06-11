"use client";

import { useGetFavouritesQuery } from "@/services/favourites/useGetFavourites";
import ProductItem from "@/components/shared/product-item/ProductItem";
import { Icon } from "@iconify/react/dist/iconify.js";
import EmptyFavourites from "./EmptyFavourites";


export default function FavouriteProductsList() {
  const { data: favouritesData, isLoading } = useGetFavouritesQuery();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] ">
        <Icon icon="svg-spinners:6-dots-scale" className="text-green" width={80} />
      </div>
    );
  }

  if (!favouritesData?.result?.length) {
    return <EmptyFavourites/>
  }

  

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center gap-3">
          <div className="bg-white p-2 rounded-lg shadow-sm">
            <Icon icon="solar:heart-bold" className="w-5 h-5 text-red-500" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">تعداد محصولات</span>
            <span className="text-lg font-semibold text-gray-800">{favouritesData.result.length} محصول</span>
          </div>
        </div>
        
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {favouritesData.result.map((item) => (
          <ProductItem 
            key={item.id} 
            item={{
              ...item,
              is_discount: item.is_discount as 0 | 1,
              sale_type: item.sale_type as 'simple' | string,
              type_discount: item.type_discount as 'percent' | 'price' | string,
              seo_title: null,
              is_favourite: true,
              price: item.sale_price
            }} 
          />
        ))}
      </div>
    </div>
  );
}