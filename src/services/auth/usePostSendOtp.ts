import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { SingleServiceResponseType } from "@/lib/types/CommonTypes";
import axiosClient from "../axiosClient";

// پاسخ مورد انتظار از سرور بعد از ارسال OTP
export interface PostOtpRequestResponse {
  success: boolean;
  status: number;
  user_message: string;
  developer_message: {
    code: number;
    message: string;
  };
}

// پارامترهایی که برای ارسال OTP باید ارسال شوند
export interface PostOtpRequestParams {
  phone: string;
  exists: number;
  type: "phone";
  minutes: number;
}

// ارسال OTP
export async function postSendOtp({ phone }: PostOtpRequestParams) {
  return (await axiosClient({
    method: "post",
    url: `/otp`,
    data: {
      phone,
      exists: 1,
      type: "phone",
      minutes: 10,
    },
  })) as SingleServiceResponseType<PostOtpRequestResponse>;
}

export function usePostSendOtp() {
  return useMutation<
    SingleServiceResponseType<PostOtpRequestResponse>, // نوع پاسخ API
    AxiosError, // نوع خطا
    PostOtpRequestParams // نوع پارامترهای ارسال شده
  >({
    mutationFn: postSendOtp,
    onSuccess: (data) => {
      console.log(" موفقیت‌آمیز:", data);
    },
  });
}
