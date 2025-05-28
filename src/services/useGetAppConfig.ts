import { QUERY_KEYS } from "@/constants/QueryKeys";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Axios, AxiosError } from "axios";
import { unstable_cache } from "next/dist/server/web/spec-extension/unstable-cache";
import axiosClient from "./axiosClient";


export interface AppConfigType {
  success: boolean;
  results: {
    information_site: {
      sitename: string;
      short_description: string;
      description: string;
      keyword: string[];
      logo: string;
      logo2: string;
      icon_logo: string;
      type_site: string;
      is_active: string;
    };
    social: {
      instagram: string | null;
      whatsApp: string | null;
      telegram: string | null;
      telegram_channel: string | null;
      aparat: string | null;
      rubika: string | null;
      igap: string | null;
      twitter: string | null;
      youTube: string | null;
      facebook: string | null;
      soundCloud: string | null;
      linkedIn: string | null;
      pinterest: string | null;
      discord: string | null;
      virgol: string | null;
    };
    business_information: {
      email_support: string;
      address: string;
      address_2: string;
      phone_support: string;
      video_about_us: string | null;
    };
    comments: {
      is_auth_comment: string;
      rates: {
        products: {
          id: number;
          title: string;
        }[];
        articles: {
          id: number;
          title: string;
        }[];
      };
    };
    login_register: {
      login_register_type: string;
      fields_required_in_register: string[];
    };
    wallet: {
      is_wallet_active: number;
      can_charge_wallet: string;
      can_transfer_bank: string;
      can_transfer_user: string;
      suggested_amount: string[];
    };
  };
}


export async function getAppConfigReq(){
  return (await axiosClient({
    method:"get",
    url: `/options`,

  })) as AppConfigType
  
}

export const getCacheAppConfigReq = unstable_cache(getAppConfigReq,["app-config"],{
  revalidate:600,// کشبرایه 60 ثانیه
})

export function useDetAppConfigReqMutation(){
  // const {Logout} = useAuthStore();
  return useMutation<AppConfigType ,AxiosError ,undefined>({
    mutationFn: getAppConfigReq,
    onError: (error :AxiosError) =>{
      if(error.code === "401") {
        //Logout();
      }
      throw error;
    },
  });
}
console.log('useGetAppConfigReqQuery',useGetAppConfigReqQuery)
export function useGetAppConfigReqQuery(){

  return useQuery<AppConfigType,AxiosError,AppConfigType>({
    queryFn:getAppConfigReq,
    queryKey: [QUERY_KEYS.appConfig]
  })
}