"use client";
import { AppConfigType } from "@/services/useGetAppConfig";
import Image from "next/image";
import React from "react";
import HeaderSearch from "./components/HeaderSearch";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { CategoryModal } from "./components/CategoryModal";
import { useAuthStore } from "@/lib/store/useAuthStore";
import AuthModal from "../auth/AuthModal";
import UserMenu from "./UserMenu";

interface MainHeaderProps {
  appConfig: AppConfigType["results"];
}
const MainHeader = ({ appConfig }: MainHeaderProps) => {
  const { user } = useAuthStore();// وضعیت کاربر از استور (اگر وارد شده باشد)
  return (
    <div className="w-full sm:block hidden  fixed top-0 z-50 bg-white min-h-[60px] border-b shadow-sm py-4">
      <div className="w-full container px-6 h-full flex items-center justify-between">
               {/* لوگوی اپلیکیشن که به صفحه اصلی لینک می‌دهد */}
        <h1 className="h-11">
          <Link href={"/"}>
            <Image
              width={146}
              height={46}
              className="!max-h-full object-contain "
              alt={appConfig?.information_site.sitename}
              src={appConfig?.information_site.logo}
            />
          </Link>
        </h1>
         {/* مدال دسته‌بندی‌ها */}
        <CategoryModal />
          {/* بخش جستجو */}
        <div className="sm:w-[460px]">
          <HeaderSearch />
        </div>
 {/* منوی ناوبری */}
        <nav className="w-fit sm:text-xs text-gray-500">
          <ul className="flex gap-x-7   divide-x divide-x-reverse   [&>li]:pr-6 [&>li]:border-gray-400">
           {/* آیتم چت */}
            <li>
              <Link href={"/#"} className="flex items-center gap-x-2">
                <span>
                  <Icon icon={"solar:chat-line-outline"} className="size-6" />
                </span>
                <p>چت</p>
              </Link>
            </li>
              {/* آیتم سبد خرید */}
            <li>
              <Link href={"/profile/cart"} className="flex items-center gap-x-2">
                <span>
                  <Icon icon={"solar:cart-5-outline"} className="size-6" />
                </span>
                <p>سبد خرید </p>
              </Link>
            </li>
              {/* آیتم ورود/عضویت یا منوی کاربر */}
            <li>
              {user ? (
                <UserMenu>
                  <span className="flex cursor-pointer items-center text-sm gap-x-2 text-caption  ">
                    <span>
                      <Icon
                        icon={"solar:user-bold-duotone"}
                        className="size-6 "
                      />
                    </span>
                    <span>
                      <span>{user?.first_name}</span>{" "}
                      <span>{user?.last_name}</span>
                    </span>
                  </span>
                </UserMenu>
              ) : (
                <AuthModal>
                  <button className="flex items-center gap-x-2 cursor-pointer">
                    <span>
                      <Icon icon={"solar:login-2-outline"} className="size-6" />
                    </span>
                    <p> ورود/عضویت </p>
                  </button>
                </AuthModal>
              )}
            </li>
          </ul>
        </nav>
  
      </div>
    </div>
  );
};

export default MainHeader;
