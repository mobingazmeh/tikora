"use client"
import axiosClient from "@/services/axiosClient";
//import { CityItemType } from "@/services/locations/useGetCities";
//import { CountryItemType } from "@/services/locations/useGetCountries";
//import { ProvinceItemType } from "@/services/locations/useGetProvinces";
import Cookies from "js-cookie";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// TODO: refactor this types when city and province and county requests implemented
//استور برایه اطلاعات کاربر

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  username: string;
  national_code: string;
  invitation_code: string;
  is_profile_complete: boolean;
  avatar: string | null;
  balance_wallet: number;
  bank_card: string | null;
  created_at: number;
  email: string | null;
  new_notifications: number;
  new_tickets: number;
}

// Define the type for your auth store state
type AuthState = {
  isAuthenticated: boolean;
  token: string | null;
  user: User | null;
  login: (user: User, token: string) => void;
  update: (user: User) => void;
  logout: (redirect?: boolean) => void;
};

// Create a persisted version of the auth store
export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      isAuthenticated: false,
      token: null,
      user: null,
      login: (user, token) => {
        Cookies.set("token", token);
        axiosClient.setAuthToken(token);
        set({ isAuthenticated: true, token, user });
      },
      update: (user) => {
        set({ user });
      },
      logout: (redirect = true) => {
        set({ isAuthenticated: false, token: null, user: null });
        Cookies.remove("token");
        if (redirect)
          setTimeout(() => {
            window.location.href = "/auth/login";
          }, 200);
      },
    }),
    {
      name: "auth-storage", // Name to identify the store in local storage
    }
  )
);

export const initializeAuthStore = (
  user: User | null,
  token: string | undefined
) => {
  console.log("UserStore: ", user);
  console.log("TokenStore: ", token);
  if (user) {
    useAuthStore.setState({ user: user, isAuthenticated: true, token: token });
  }
};

