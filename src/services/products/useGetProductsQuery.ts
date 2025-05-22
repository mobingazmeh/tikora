import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { QUERY_KEYS } from "@/constants/QueryKeys";
import { unstable_cache } from "next/cache";
import axiosClient from "../axiosClient";
import { GetProductsReqParams, ProductsListResponseType, SingleServiceResponseType } from "@/lib/types/CommonTypes";
import { url } from "inspector";

//تایپ لیست محصولات

export async function getProductsReq(data:GetProductsReqParams){
  const params = {
    page: data.page || 1,
    per_page: data.per_page || 5,
    search: data.search,
    just_exist: data.just_exist,
    attributes: data.attributes,
    price_range: data.price_range,
    variety: data.variety,
    only_in_discount: data.only_in_discount,
    sort: data.sort,
    categories: data.categories,
    brands: data.brands
};


    console.log('Request params:', params);

    return (await axiosClient({
        method: "get",
        url: '/products',
        params: params
    })) as SingleServiceResponseType<ProductsListResponseType>;
}
//کش سمت سرور
export const getCachedProductsReq = unstable_cache(getProductsReq, ["products"], {
    revalidate: 60, // کش برای ۶۰ ثانیه
  });

  //ارسال درخواست بصورت دستی
export function useGetProductsReqMutation() {
    //   const { logout } = useAuthStore();
    return useMutation<
      SingleServiceResponseType<ProductsListResponseType>,
      AxiosError,
      GetProductsReqParams
    >({
      mutationFn: getProductsReq,
    });
  }
  // برایه گرفتن خودکار داده ها هنگام رندر
export function useGetProductsListQuery(params: GetProductsReqParams) {
    //   const { logout } = useAuthStore();
    return useQuery<
      SingleServiceResponseType<ProductsListResponseType>,
      AxiosError,
      SingleServiceResponseType<ProductsListResponseType>
    >({
      queryFn: () => getProductsReq(params),
      queryKey: [QUERY_KEYS.products, params],
    });
  }


