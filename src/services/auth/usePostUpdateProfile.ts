import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { SingleServiceResponseType } from "@/lib/types/CommonTypes";
import axiosClient from "../axiosClient";
import { User } from "@/lib/store/useAuthStore";

export type PostUpdateProfileRequestResponse = User;

export type PostUpdateProfileRequestParams = {
  first_name: string;
  last_name: string;
  phone: string;
  national_code: string;
  email: string;
  username: string;
  invitation_code?: string;
};

// بروز رسانی کاربر
export async function postUpdateProfile(data: PostUpdateProfileRequestParams) {
  return (await axiosClient({
    method: "put",
    url: `/user/update`,
    data,
  })) as SingleServiceResponseType<PostUpdateProfileRequestResponse>;
}

export function usePostUpdateProfile() {
  //   const { logout } = useAuthStore();
  return useMutation<
    SingleServiceResponseType<PostUpdateProfileRequestResponse>,
    AxiosError,
    PostUpdateProfileRequestParams
  >({
    mutationFn: postUpdateProfile,
  });
}
