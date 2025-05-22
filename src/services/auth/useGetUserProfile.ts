import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosRequestConfig } from "axios";

import { QUERY_KEYS } from "@/constants/QueryKeys";
import { User } from "@/lib/store/useAuthStore";
import { SingleServiceResponseType } from "@/lib/types/CommonTypes";
import axiosClient from "../axiosClient";

export type GetUserProfileResponseType = {
  user:User
};
// دریافت اطلاعات کاربر لاگین شده
export async function getUserProfileReq(config?: AxiosRequestConfig) {
 
    return (await axiosClient({
    method: "get",
    url: `/user`,
    ...config,
  })) as SingleServiceResponseType<GetUserProfileResponseType>;
}

export function useGetUserProfileReqMutation() {
  //   const { logout } = useAuthStore();
  return useMutation<
    SingleServiceResponseType<GetUserProfileResponseType>,
    AxiosError,
    undefined
  >({
    mutationFn: () => getUserProfileReq(),
  });
}

export function useGetUserProfileQuery() {
  //   const { logout } = useAuthStore();
  return useQuery<
    SingleServiceResponseType<GetUserProfileResponseType>,
    AxiosError,
    SingleServiceResponseType<GetUserProfileResponseType>
  >({
    queryFn: () => getUserProfileReq(),
    queryKey: [QUERY_KEYS.profile],
    
  });
}
