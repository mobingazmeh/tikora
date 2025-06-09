import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { SingleServiceResponseType } from "@/lib/types/CommonTypes";
import axiosClient from "../axiosClient";

export interface PostOtpRequestResponse {
  success: boolean;
  status: number;
  user_message: string;
  developer_message: {
    code: number;
    message: string;
  };
}

export interface PostOtpRequestParams {
  phone: string;
  exists: number,
  type: string,
  minutes:number;
}

export async function postSendOtp({ phone }: PostOtpRequestParams) {
  return (await axiosClient({
    method: "post",
    url: `/otp`,
    data: {
      phone,
      exists: 0,
      type: "phone",
      minutes: 2
    },
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })) as SingleServiceResponseType<PostOtpRequestResponse>;
}

export function usePostSendOtp() {
  return useMutation<
    SingleServiceResponseType<PostOtpRequestResponse>,
    AxiosError,
    PostOtpRequestParams
  >({
    mutationFn: postSendOtp,
    onSuccess: (data) => {
      console.log("ارسال OTP موفقیت‌آمیز:", data);
    },
    onError: (error) => {
      console.error("خطا در ارسال OTP:", error.response?.data);
    }
  });
}