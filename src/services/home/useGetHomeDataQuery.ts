import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { QUERY_KEYS } from "@/constants/QueryKeys";
import { SingleServiceResponseType } from "@/lib/types/CommonTypes";
import axiosClient from "../axiosClient";
import { unstable_cache } from "next/cache";
import { HomeDataResponseType } from "@/lib/types/HomeServiceTypes";

///  دریافتت اطلاعات صفحه اصلی
export async function getHomeData() {
  return (await axiosClient({
    method: "get",
    url: `/pages/page/home`,
  })) as SingleServiceResponseType<HomeDataResponseType>;
}

export const getCachedHomeData = unstable_cache(getHomeData, ["home-data"], {
  revalidate: 60, // کش برای ۶۰ ثانیه
});

export function useGetHomeDataQuery() {
  return useQuery<SingleServiceResponseType<HomeDataResponseType>, AxiosError>({
    queryKey: [QUERY_KEYS.homeData],
    queryFn: getHomeData,
  });
}