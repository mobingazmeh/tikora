import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/QueryKeys";
import axiosClient from "../axiosClient";
import { unstable_cache } from "next/cache";

/// دریافت اطلاعات فوتر
export async function getFooterData() {
  return (await axiosClient({
    method: "get",
    url: `/pages/footer`,
  }))  ;
}

export const getCachedFooterData = unstable_cache(getFooterData, ["footer-data"], {
  revalidate: 60, // کش برای ۶۰ ثانیه
});

export function useGetFooterQuery() {
  return useQuery ({
    queryKey: [QUERY_KEYS.footerData],
    queryFn: getFooterData,
    staleTime: 60 * 1000, // داده‌ها برای ۶۰ ثانیه تازه در نظر گرفته می‌شوند
  });
}