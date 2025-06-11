import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { SingleServiceResponseType } from "@/lib/types/CommonTypes";
import axiosClient from "../axiosClient";
import { User } from "@/lib/store/useAuthStore";
import { useAuthStore } from "@/lib/store/useAuthStore";

export interface PostLoginByOtpRequestResponse {
  token: string;
  is_before_register: boolean;
  is_profile_complete: boolean;
  user: User;
}

export interface PostLoginByOtpRequestParams {
  phone: string;
  code: string;
}
// درخواست ورود با otp
export async function postSendOtp(data: PostLoginByOtpRequestParams) {
  return (await axiosClient({
    method: "post",
    url: `/login_register`,
    data,
  })) as SingleServiceResponseType<PostLoginByOtpRequestResponse>;
}

export function usePostLoginByOtp() {
  const login = useAuthStore((state) => state.login);
  //   const { logout } = useAuthStore();
  return useMutation<
    SingleServiceResponseType<PostLoginByOtpRequestResponse>,
    AxiosError,
    PostLoginByOtpRequestParams
  >({
    mutationFn: postSendOtp,
    onSuccess: (data) => {
      console.log("✅ ورود موفقیت‌آمیز:", data);
      

      const { token, user } = data.result;
      login(user, token);
    },
  });
}

