import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/QueryKeys";
import axiosClient from "../axiosClient";
import { SingleServiceResponseType } from "@/lib/types/CommonTypes";
import { unstable_cache } from "next/cache";


export interface FavouriteItem {
    id: number;
    title: string;
    brief: string;
    cover: string;
    inventory: number;
    is_discount: number;
    old_price: number;
    sale_price: number;
    sale_type: string;
    sku: string;
    type_discount: string;
    value_discount: number;
  }
  


// دریافت لیست علاقه‌مندی‌ها
export async function getFavouritesReq(): Promise<SingleServiceResponseType<FavouriteItem[]>> {
  const response = await axiosClient<SingleServiceResponseType<FavouriteItem[]>>({
    method: "get",
    url: "/favourite",
    params: { type: "products" },
  });
  return response.data;
}

 

// کش سمت سرور برای لیست علاقه‌مندی‌ها

export const getCachedFavouritesReq = unstable_cache(
  getFavouritesReq,
  ["favourite-list"],
  {
    revalidate: 60, // اعتبار کش ۶۰ ثانیه
  }
);


export function useGetFavouritesQuery() {
  return useQuery({
    queryKey: [QUERY_KEYS.favouritesList],
    queryFn: getFavouritesReq,
  });
}

