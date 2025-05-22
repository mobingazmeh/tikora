import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { QUERY_KEYS } from "@/constants/QueryKeys";
import { SingleServiceResponseType } from "@/lib/types/CommonTypes";
import axiosClient from "../axiosClient";
import { HomeDataResponseType } from "../../lib/types/HomeServiceTypes";
import { unstable_cache } from "next/cache";
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

export function useGetHomeDataReqMutation() {
  //   const { logout } = useAuthStore();
  return useMutation<
    SingleServiceResponseType<HomeDataResponseType>,
    AxiosError
  >({
    mutationFn: getHomeData,
  });
}

