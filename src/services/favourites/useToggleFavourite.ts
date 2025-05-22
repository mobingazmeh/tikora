import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/QueryKeys";
import axiosClient from "../axiosClient";
import { SingleServiceResponseType } from "@/lib/types/CommonTypes";

interface ToggleFavouriteParams {
  id: number;
  type: "products";
}

interface ToggleFavouriteResponse {
  message: string;
  status: boolean;
}

// درخواست toggle کردن علاقه‌مندی
export async function toggleFavouriteReq(params: ToggleFavouriteParams): Promise<SingleServiceResponseType<ToggleFavouriteResponse>> {
  return (await axiosClient({
    method: "post",
    url: "/favourite",
    data: params,
  }));
}

export function useToggleFavouriteMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleFavouriteReq,
    onSuccess: () => {
      // به‌روزرسانی لیست علاقه‌مندی‌ها بعد از تغییر
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.favouritesList] });
    },
  });
} 