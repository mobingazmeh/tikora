"use client";
import { AppConfigType } from "@/services/useGetAppConfig";
import { create } from "zustand";

interface AppConfigStoreType {
  config: null | AppConfigType["results"];
  setConfig: (config: AppConfigType["results"]) => void;
}

const useAppConfigStore = create<AppConfigStoreType>((set) => ({
  config: null, // مقدار اولیه
  setConfig: (config) => {
    if (config) set({ config });
  },
}));

export const initializeAppConfig = (initialProps: AppConfigType["results"]) => {
  if (initialProps) {
    useAppConfigStore.setState({ config: initialProps });
  
  }
};

export default useAppConfigStore;
