"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { unstable_cache } from "next/cache";

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
  try {
    const response = await axiosClient({
      method: "get",
      url: `/categories`,
      params: data
    }) as SingleServiceResponseType<CategoryResponseType>;

    console.log("✅ Raw Response:", response);
    console.log("✅ Categories count:", response.result);
    
    return response;
  } catch (error) {
    console.error("❌ Error fetching categories:", error);
    throw error;
  }
}

// کش کردن درخواست دسته‌بندی
export const getCachedCategoriesListReq = unstable_cache(
  getCategoriesListReq,
  ["categories-list"],
  {
    revalidate: 60, // اعتبار کش ۶۰ ثانیه
  }
);

export function useGetCategoriesListReqMutation() {
  return useMutation<
    SingleServiceResponseType<CategoryResponseType>,
    AxiosError,
    GetCategoriesReqParams
  >({
    mutationFn: getCategoriesListReq,
  });
}

export function useGetCategoriesListQuery(params: GetCategoriesReqParams = {}) {
  return useQuery({
    queryKey: [QUERY_KEYS.categories, params],
    queryFn: () => getCategoriesListReq(params),
    enabled: true, // همیشه فعال باشد
    retry: 3, // در صورت خطا 3 بار تلاش کند
    staleTime: 1000 * 60, // داده‌ها برای 1 دقیقه تازه در نظر گرفته شوند
  });
}