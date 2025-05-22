import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { QUERY_KEYS } from "@/constants/QueryKeys";
import {
  SingleServiceResponseType
} from "@/lib/types/CommonTypes";
import axiosClient from "../axiosClient";

export interface BrandItemType {
  id: number;
  title: string;
  slug: string;
  cover: string | null;
  description: string | null;
  icon: string | null;
  is_active: number;
  keyword: string | null;
  order: number | null;
}


export type BrandsResponseType = BrandItemType[];

export interface GetBrandsReqParams {
  search_key?:string| null
}
// دریافت لیست برند ها
export async function getBrandsListReq(params: GetBrandsReqParams) {
  return (await axiosClient({
    method: "get",
    url: `/brands`,
    params,
  })) as SingleServiceResponseType<BrandsResponseType>;
}

export function useGetBrandsListReqMutation() {
  //   const { logout } = useAuthStore();
  return useMutation<
    SingleServiceResponseType<BrandsResponseType>,
    AxiosError,
    GetBrandsReqParams
  >({
    mutationFn: getBrandsListReq,
  });
}

export function useGetBrandsListQuery(params: GetBrandsReqParams) {
  //   const { logout } = useAuthStore();
  return useQuery<
    SingleServiceResponseType<BrandsResponseType>,
    AxiosError,
    SingleServiceResponseType<BrandsResponseType>
  >({
    queryFn: () => getBrandsListReq(params),
    queryKey: [QUERY_KEYS.brands, params],
  });
}
