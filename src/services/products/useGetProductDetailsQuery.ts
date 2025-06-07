import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { QUERY_KEYS } from "@/constants/QueryKeys";
import { unstable_cache } from "next/cache";
import axiosClient from "../axiosClient";
import { ProductDetailsResponseType, SingleServiceResponseType } from "@/lib/types/CommonTypes";

// نوع ها  همرا با ارث بری
// تایپ پارامترهای درخواست جزئیات محصول
export interface GetProductDetailsReqParams {
  productId: number; // فرض می‌کنم که شناسه محصول برای درخواست جزئیات محصول ضروری باشد
}

// تاببع درخواست
export async function getProductDetailsReq(data: GetProductDetailsReqParams) {
  return (await axiosClient({
    method: "get",
    url: `/products/${data.productId}`,
   
  })) as SingleServiceResponseType<ProductDetailsResponseType>;
}
//کش سمت سرور
export const getCachedProductDetailsReq = unstable_cache(
  getProductDetailsReq,
  ["product-details"],
  {
    revalidate: 60, // کش برای ۶۰ ثانیه
  }
);

// کش بصورت دستی
export function useGetProductDetailsReqMutation() {
  //   const { logout } = useAuthStore();
  return useMutation<
    SingleServiceResponseType<ProductDetailsResponseType>,
    AxiosError,
    GetProductDetailsReqParams
  >({
    mutationFn: getProductDetailsReq,
  });
}
// کش بصورت خود کار
export function useGetProductDetailsListQuery(
  params: GetProductDetailsReqParams
) {
  //   const { logout } = useAuthStore();
  return useQuery<
    SingleServiceResponseType<ProductDetailsResponseType>,
    AxiosError,
    SingleServiceResponseType<ProductDetailsResponseType>
  >({
    queryFn: () => getProductDetailsReq(params),
    queryKey: [QUERY_KEYS.productDetails, params],
  });
}
