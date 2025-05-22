"use client";

import { useGetFavouritesQuery } from "@/services/favourites/useGetFavourites";
import ProductItem from "@/components/shared/product-item/ProductItem";
import EmptyFavourites from "./EmptyFavourites";
import FavouritesSkeleton from "./FavouritesSkeleton";

export default function FavouriteProductsList() {
  const { data: favouritesData, isLoading } = useGetFavouritesQuery();

  if (isLoading) {
    return <FavouritesSkeleton />;
  }

  if (!favouritesData?.result?.length) {
    return <EmptyFavourites />;
  }

  return (
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
            is_favourite: true
          }} 
        />
      ))}
    </div>
  );
} 