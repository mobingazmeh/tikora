"use client";

import { useAuthStore } from "@/lib/store/useAuthStore";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useWindowSize } from "react-use";

/**
 * کامپوننت منوی پروفایل
 * این کامپوننت منوی اصلی پروفایل کاربر را نمایش می‌دهد
 * شامل لینک‌های مختلف به بخش‌های مختلف پروفایل
 */
const ProfileMenu = () => {
    // استفاده از استور احراز هویت برای عملیات خروج
    const { logout } = useAuthStore();
    const isMobile = useWindowSize().width < 768;

    /**
     * آیتم‌های منوی پروفایل
     * هر آیتم شامل:
     * - label: عنوان آیتم
     * - icon: آیکون آیتم
     * - isSpecial: مشخص کننده آیتم‌های ویژه (مثل دکمه فروشنده شوید)
     * - href: لینک مربوطه
     * - key: کلید یکتا برای هر آیتم
     * - onClick: تابع اجرایی برای آیتم‌های خاص (مثل دکمه خروج)
     */
    const profileItems = [
      {
        label: "مبین گزمه ",
        icon: "solar:user-outline",
        isSpecial: false,
        href: "/profile/account-setting",
        key: "profile",
      },
      {
        label: "علاقه‌مندی‌ها",
        icon: "solar:heart-linear",
        isSpecial: false,
        href: "/profile/favourites",
        key: "favourites",
      },
      {
        label: "سبد خرید",
        icon: "solar:cart-3-linear",
        isSpecial: false,
        href: "/profile/cart",
        key: "cart",
      },
      {
        label: "سفارش‌های من",
        icon: "solar:box-linear",
        isSpecial: false,
        href: "/profile/orders",
        key: "orders",
      },
     
      {
        label: "آدرس‌ها",
        icon: "solar:map-point-linear",
        isSpecial: false,
        href: "/profile/addresses",
        key: "addresses",
      },
      {
        label: "آگهی‌های من",
        icon: "solar:document-text-outline",
        isSpecial: false,
        href: "/profile/ads",
        key: "ads",
      },
      {
        label: "پیامها",
        icon: "solar:chat-line-outline",
        isSpecial: false,
        href: "/profile/messages",
        key: "messages",
      },
      {
        label: "آگهی‌های ذخیره شده",
        icon: "solar:bookmark-outline",
        isSpecial: false,
        href: "/profile/saved",
        key: "saved",
      },
      {
        label: "تنظیمات حساب",
        icon: "solar:settings-linear",
        isSpecial: false,
        href: "/profile/settings",
        key: "settings",
      },
      {
        label: "پرسش‌ها و ارتباط با ما",
        icon: "solar:chat-square-call-outline",
        isSpecial: false,
        href: "/profile/support",
        key: "support",
      },
      {
        label: "خروج از حساب کاربری",
        icon: "solar:logout-2-outline",
        isSpecial: false,
        href: "/logout",
        key: "logout",
        onClick: () => {
          logout();
        },
      },
    ];

    // دریافت مسیر فعلی برای تشخیص آیتم فعال
    const pathname = usePathname();

    return (
      <div
        className={cn("w-60  pl-6 border-l ", isMobile && "w-full pr-3 h-full ")}
      >
        <ul className="w-full space-y-2">
          {profileItems.map((item) => {
            const isSpecial = item.isSpecial;
            const isActive = pathname.startsWith(item.href);

            // رندر آیتم‌های ویژه (مثل دکمه فروشنده شوید)
            if (isSpecial) {
              return (
                <li key={item.key}>
                  <Link
                    href="/become-seller"
                    className="flex items-center justify-between px-2 py-3 bg-gradient-to-br from-green to-primary-100 text-black transition-colors rounded-lg"
                  >
                    <div className="flex items-center gap-x-4">
                      <span>
                        <Icon icon={"clarity:store-line"} className="size-6" />
                      </span>
                    </div>
                    <span className="text-sm  font-medium">
                      <Icon
                        icon={"solar:alt-arrow-left-linear"}
                        className="size-4"
                      />
                    </span>
                  </Link>
                </li>
              );
            } 
            // رندر آیتم‌های معمولی با عملیات خاص (مثل دکمه خروج)
            else if (item.onClick) {
              return (
                <li key={item.key}>
                  <button
                    onClick={item.onClick}
                    className={cn(
                      isActive &&
                        "bg-green-500 bg-opacity-[7%] text-green-500",
                      "w-full flex items-center rounded-lg justify-between py-4 px-2"
                    )}
                  >
                    <span className="flex items-center gap-4">
                      <span>
                        <Icon icon={item.icon} className="size-6" />
                      </span>
                      <span> {item.label} </span>
                    </span>
                    <span>
                      <Icon
                        icon="solar:alt-arrow-left-linear"
                        className="size-4"
                      />
                    </span>
                  </button>
                </li>
              );
            } 
            // رندر آیتم‌های معمولی با لینک
            else {
              return (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className={cn(
                      isActive &&
                        "bg-green bg-opacity-[7%] text-green",
                      "w-full flex items-center rounded-lg justify-between py-4 px-2"
                    )}
                  >
                    <span className="flex items-center gap-4">
                      <span>
                        <Icon icon={item.icon} className="size-6" />
                      </span>
                      <span> {item.label} </span>
                    </span>
                    <span>
                      <Icon
                        icon="solar:alt-arrow-left-linear"
                        className="size-4"
                      />
                    </span>
                  </Link>
                </li>
              );
            }
          })}
        </ul>
      </div>
    );
  };
  
export default ProfileMenu;