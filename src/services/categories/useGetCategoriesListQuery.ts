import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { QUERY_KEYS } from "@/constants/QueryKeys";
import {
  PaginationType,
  SingleServiceResponseType,
} from "@/lib/types/CommonTypes";
import axiosClient from "../axiosClient";

export interface CategoryItemType {
  id: number;
  title: string;
  slug: string;
  cover: string | null;
  icon: string | null;
  description: string | null;
  count: number;
  is_active: number;
  keyword: string | null;
  order: number;
  children: CategoryItemType[];
  parent?: {
    id: number;
    title: string;
    slug: string;
  };
}

export interface CategoryResponseType {
  result: CategoryItemType[];
}

export interface GetCategoriesReqParams {
  OnlyHasCover?: number;
  OnlyHasIcon?: number;
  limit?: number;
  WithOutChildren?: number;
  type?: 'product' | 'service';
}

// دریافت دسته‌بندی
export async function getCategoriesListReq(data: GetCategoriesReqParams) {
  return (await axiosClient({
    method: "get",
    url: `/categories`,
    params: data, // تغییر data به params چون درخواست GET است
  })) as SingleServiceResponseType<CategoryResponseType>;
}

export function useGetCategoriesListReqMutation() {
  //   const { logout } = useAuthStore();
  return useMutation<
    SingleServiceResponseType<CategoryResponseType>,
    AxiosError,
    GetCategoriesReqParams
  >({
    mutationFn: getCategoriesListReq,
  });
}

export function useGetCategoriesListQuery(params: GetCategoriesReqParams) {
  //   const { logout } = useAuthStore();
  return useQuery<
    SingleServiceResponseType<CategoryResponseType>,
    AxiosError,
    SingleServiceResponseType<CategoryResponseType>
  >({
    queryFn: () => getCategoriesListReq(params),
    queryKey: [QUERY_KEYS.categories, params],
  });
}
